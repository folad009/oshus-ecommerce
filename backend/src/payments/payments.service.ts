import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { formatOrderNumber, parseOrderNumber } from "../common/order-format";
import { OrdersService } from "../orders/orders.service";
import { KwikService } from "../shipping/kwik.service";
import { OpayService } from "./opay.service";
import {
  normalizePaymentProvider,
  PaymentProvider,
} from "./payment-provider.enum";
import { PaystackService } from "./paystack.service";
import { StoreCurrency } from "@prisma/client";
import { toMinorUnits } from "../common/currency";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paystackService: PaystackService,
    private readonly opayService: OpayService,
    private readonly kwikService: KwikService,
    private readonly config: ConfigService
  ) {}

  private get frontendUrl() {
    return this.config.get<string>("FRONTEND_URL") ?? "http://localhost:3000";
  }

  private get backendUrl() {
    const port = this.config.get<string>("PORT") ?? "3001";
    return this.config.get<string>("BACKEND_PUBLIC_URL") ??
      `http://localhost:${port}/api`;
  }

  async initializePayment(orderNumber: string, providerInput: string) {
    const provider = normalizePaymentProvider(providerInput);
    if (!provider) {
      throw new BadRequestException("Invalid payment provider.");
    }

    const order = await this.ordersService.findOrderEntityByNumber(orderNumber);

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new UnprocessableEntityException("Order is already paid.");
    }

    if (order.currency === StoreCurrency.ZAR && provider === PaymentProvider.OPAY) {
      throw new BadRequestException(
        "OPay only supports Nigerian Naira. Choose Paystack for ZAR payments."
      );
    }

    const reference = `${parseOrderNumber(orderNumber)}-${Date.now()}`;
    const amountMinor = toMinorUnits(order.total);
    const callbackUrl = `${this.frontendUrl}/payment/callback`;
    const webhookCallback = `${this.backendUrl}/payments/webhooks/opay`;

    await this.ordersService.attachPaymentReference(order.id, {
      paymentReference: reference,
      paymentMethod: provider === PaymentProvider.PAYSTACK ? "Paystack" : "OPay",
    });

    if (provider === PaymentProvider.PAYSTACK) {
      const result = await this.paystackService.initializePayment({
        email: order.customerEmail,
        amountMinor,
        currency: order.currency,
        reference,
        callbackUrl,
        metadata: {
          orderNumber: formatOrderNumber(order.orderNumber),
        },
      });

      return {
        provider,
        authorizationUrl: result.authorizationUrl,
        reference: result.reference,
        sandbox: result.sandbox,
      };
    }

    const result = await this.opayService.initializePayment({
      email: order.customerEmail,
      amountMinor,
      reference,
      callbackUrl: webhookCallback,
      returnUrl: callbackUrl,
      customerName: order.customerName,
    });

    return {
      provider,
      authorizationUrl: result.authorizationUrl,
      reference: result.reference,
      sandbox: result.sandbox,
    };
  }

  async verifyPayment(reference: string, providerInput: string) {
    const provider = normalizePaymentProvider(providerInput);
    if (!provider) {
      throw new BadRequestException("Invalid payment provider.");
    }

    const order = await this.ordersService.findOrderByPaymentReference(reference);
    if (!order) {
      throw new NotFoundException("Order not found for payment reference.");
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return this.buildVerifyResponse(order);
    }

    const verification =
      provider === PaymentProvider.PAYSTACK
        ? await this.paystackService.verifyPayment(reference)
        : await this.opayService.verifyPayment(reference);

    if (!verification.success) {
      await this.ordersService.markPaymentFailed(order.id);
      throw new UnprocessableEntityException("Payment was not successful.");
    }

    const paidOrder = await this.completePaidOrder(order.id);
    return this.buildVerifyResponse(paidOrder);
  }

  async handlePaystackWebhook(rawBody: Buffer, signature: string | undefined) {
    if (!this.paystackService.verifyWebhookSignature(rawBody, signature)) {
      throw new BadRequestException("Invalid Paystack signature.");
    }

    const payload = JSON.parse(rawBody.toString()) as {
      event?: string;
      data?: { reference?: string; status?: string };
    };

    if (payload.event !== "charge.success" || !payload.data?.reference) {
      return { received: true };
    }

    const order = await this.ordersService.findOrderByPaymentReference(
      payload.data.reference
    );

    if (!order || order.paymentStatus === PaymentStatus.PAID) {
      return { received: true };
    }

    await this.completePaidOrder(order.id);
    return { received: true };
  }

  async handleOpayWebhook(body: Record<string, unknown>) {
    const reference =
      typeof body.reference === "string"
        ? body.reference
        : typeof body.orderNo === "string"
          ? body.orderNo
          : null;

    if (!reference) {
      return { received: true };
    }

    const order = await this.ordersService.findOrderByPaymentReference(reference);
    if (!order || order.paymentStatus === PaymentStatus.PAID) {
      return { received: true };
    }

    const verification = await this.opayService.verifyPayment(reference);
    if (verification.success) {
      await this.completePaidOrder(order.id);
    }

    return { received: true };
  }

  private async completePaidOrder(orderId: string) {
    const order = await this.ordersService.markOrderPaid(orderId);

    try {
      const shipment = await this.kwikService.createDelivery({
        orderNumber: formatOrderNumber(order.orderNumber),
        deliveryAddress: order.shippingAddress,
        deliveryCity: order.deliveryCity,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        latitude: order.deliveryLatitude ?? undefined,
        longitude: order.deliveryLongitude ?? undefined,
        shippingFee: order.shippingFee,
      });

      return this.ordersService.attachDeliveryDetails(order.id, {
        trackingNumber: shipment.trackingNumber,
        kwikTrackingUrl: shipment.trackingUrl,
        estimatedDelivery: shipment.estimatedDelivery,
        status: OrderStatus.PROCESSING,
      });
    } catch {
      return this.ordersService.updateOrderStatusInternal(
        order.id,
        OrderStatus.PROCESSING
      );
    }
  }

  private buildVerifyResponse(order: Awaited<ReturnType<OrdersService["markOrderPaid"]>>) {
    return {
      success: true,
      orderNumber: formatOrderNumber(order.orderNumber),
      paymentStatus: order.paymentStatus,
      trackingNumber: order.trackingNumber,
      kwikTrackingUrl: order.kwikTrackingUrl,
      total: order.total,
      currency: order.currency,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
    };
  }
}
