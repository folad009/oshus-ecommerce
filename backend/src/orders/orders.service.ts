import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderStatus, PaymentStatus, Role } from "@prisma/client";
import {
  convertNgnToZar,
  getNgnToZarRate,
  normalizeStoreCurrency,
} from "../common/currency";
import {
  formatDateTime,
  formatOrderDate,
  formatOrderNumber,
  parseOrderNumber,
  toClientOrderStatus,
  toPrismaOrderStatus,
} from "../common/order-format";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

function buildFulfillmentSteps(
  status: OrderStatus,
  placedAt: Date,
  paymentMethod: string
) {
  const placed = formatDateTime(placedAt);
  const steps = [
    {
      id: "placed",
      label: "Order placed",
      timestamp: placed,
      status: "completed" as const,
    },
    {
      id: "paid",
      label: `Payment confirmed (${paymentMethod})`,
      timestamp: placed,
      status: "completed" as const,
    },
    {
      id: "processing",
      label: "Warehouse processing",
      timestamp: "",
      note: "Picking items from inventory",
      status: "pending" as const,
    },
    {
      id: "shipped",
      label: "Shipped",
      timestamp: "",
      status: "pending" as const,
    },
    {
      id: "delivered",
      label: "Delivered",
      timestamp: "",
      status: "pending" as const,
    },
  ];

  if (status === OrderStatus.CANCELLED) {
    return [
      steps[0],
      {
        id: "cancelled",
        label: "Order cancelled",
        timestamp: placed,
        status: "current" as const,
      },
    ];
  }

  if (status === OrderStatus.PENDING) {
    return [
      steps[0],
      { ...steps[1], status: "current" as const },
      ...steps.slice(2),
    ];
  }

  if (status === OrderStatus.PROCESSING) {
    return [
      ...steps.slice(0, 2),
      { ...steps[2], status: "current" as const },
      ...steps.slice(3),
    ];
  }

  if (status === OrderStatus.SHIPPED) {
    return [
      ...steps.slice(0, 3).map((s) => ({ ...s, status: "completed" as const })),
      { ...steps[3], status: "current" as const },
      steps[4],
    ];
  }

  return steps.map((s) => ({ ...s, status: "completed" as const }));
}

function buildActivityLog(
  orderNumber: string,
  status: OrderStatus,
  placedAt: Date
) {
  const time = formatDateTime(placedAt);
  const entries = [
    {
      id: "1",
      time,
      actor: "System",
      action: `Order ${formatOrderNumber(orderNumber)} placed`,
    },
    {
      id: "2",
      time,
      actor: "Payment Gateway",
      action: "Payment confirmed",
    },
  ];

  if (status !== OrderStatus.PENDING) {
    entries.push({
      id: "3",
      time,
      actor: "Warehouse",
      action: "Order moved to processing",
    });
  }

  if (
    status === OrderStatus.SHIPPED ||
    status === OrderStatus.DELIVERED
  ) {
    entries.push({
      id: "4",
      time,
      actor: "Logistics",
      action: "Shipment dispatched",
    });
  }

  if (status === OrderStatus.DELIVERED) {
    entries.push({
      id: "5",
      time,
      actor: "System",
      action: "Order marked as delivered",
    });
  }

  if (status === OrderStatus.CANCELLED) {
    return [
      entries[0],
      {
        id: "3",
        time,
        actor: "Admin",
        action: "Order cancelled",
      },
    ];
  }

  return entries;
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  private formatListOrder(order: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    orderDate: Date;
    itemCount: number;
    total: number;
    status: OrderStatus;
    paymentMethod: string;
  }) {
    return {
      id: formatOrderNumber(order.orderNumber),
      customer: order.customerName,
      email: order.customerEmail,
      date: formatOrderDate(order.orderDate),
      items: order.itemCount,
      total: order.total,
      status: toClientOrderStatus(order.status),
      paymentMethod: order.paymentMethod,
    };
  }

  private async findOrderBySlug(slug: string) {
    const orderNumber = parseOrderNumber(slug);
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException("Order not found.");
    }

    return order;
  }

  async listAdminOrders() {
    const orders = await this.prisma.order.findMany({
      orderBy: { orderDate: "desc" },
    });
    return orders.map((order) => this.formatListOrder(order));
  }

  async listVendorOrders(vendorId: string) {
    const items = await this.prisma.orderItem.findMany({
      where: { vendorId },
      include: { order: true },
    });

    const byOrder = new Map<
      string,
      {
        order: (typeof items)[0]["order"];
        qty: number;
        total: number;
      }
    >();

    for (const item of items) {
      const existing = byOrder.get(item.orderId);
      const lineTotal = item.unitPrice * item.quantity;
      if (existing) {
        existing.qty += item.quantity;
        existing.total += lineTotal;
      } else {
        byOrder.set(item.orderId, {
          order: item.order,
          qty: item.quantity,
          total: lineTotal,
        });
      }
    }

    return Array.from(byOrder.values())
      .map(({ order, qty, total }) => ({
        id: formatOrderNumber(order.orderNumber),
        customer: order.customerName,
        date: formatOrderDate(order.orderDate),
        items: qty,
        total,
        status: toClientOrderStatus(order.status),
        commission: Math.round(total * 0.12),
      }))
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }

  async getOrderDetail(slug: string) {
    const order = await this.findOrderBySlug(slug);
    const status = toClientOrderStatus(order.status);

    return {
      orderId: formatOrderNumber(order.orderNumber),
      status,
      customer: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      placedAt: formatDateTime(order.orderDate),
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress,
      carrier: order.carrier,
      trackingNumber: order.trackingNumber ?? "—",
      estimatedDelivery: order.estimatedDelivery ?? "—",
      total: order.total,
      items: order.itemCount,
      fulfillmentSteps: buildFulfillmentSteps(
        order.status,
        order.orderDate,
        order.paymentMethod
      ),
      lineItems: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        sku: item.sku || "—",
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      activityLog: buildActivityLog(
        order.orderNumber,
        order.status,
        order.orderDate
      ),
    };
  }

  async updateStatus(slug: string, status: string) {
    const prismaStatus = toPrismaOrderStatus(status);
    if (!prismaStatus) {
      throw new UnprocessableEntityException("Invalid order status.");
    }

    const order = await this.findOrderBySlug(slug);
    const updated = await this.prisma.order.update({
      where: { id: order.id },
      data: { status: prismaStatus },
      include: { items: true },
    });

    return this.getOrderDetail(updated.orderNumber);
  }

  async lookupOrder(orderNumber: string, email?: string) {
    const normalized = parseOrderNumber(orderNumber);
    const order = await this.prisma.order.findFirst({
      where: {
        orderNumber: normalized,
        ...(email
          ? { customerEmail: email.trim().toLowerCase() }
          : {}),
      },
    });

    if (!order) {
      throw new NotFoundException("Order not found.");
    }

    return {
      id: formatOrderNumber(order.orderNumber),
      customer: order.customerName,
      email: order.customerEmail,
      date: formatOrderDate(order.orderDate),
      status: toClientOrderStatus(order.status),
      total: order.total,
    };
  }

  async createOrder(dto: CreateOrderDto, customerId?: string) {
    if (!dto.items.length) {
      throw new UnprocessableEntityException("Order must include items.");
    }

    const currency = normalizeStoreCurrency(dto.currency);
    const ngnToZarRate = getNgnToZarRate(this.config);

    const itemsSubtotalNgn = dto.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const shippingFeeNgn = Math.max(0, Math.round(dto.shippingFee ?? 0));

    const convertAmount = (amountNgn: number) =>
      currency === "ZAR"
        ? convertNgnToZar(amountNgn, ngnToZarRate)
        : amountNgn;

    const shippingFee = convertAmount(shippingFeeNgn);
    const orderItems = dto.items.map((item) => ({
      ...item,
      unitPrice: convertAmount(item.unitPrice),
    }));

    const itemsSubtotal = orderItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const total = itemsSubtotal + shippingFee;
    const itemCount = dto.items.reduce((sum, item) => sum + item.quantity, 0);
    const orderNumber = `SDGT${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const paymentMethod =
      dto.paymentMethod?.toLowerCase() === "opay" ? "OPay" : "Paystack";

    const productIds = dto.items
      .map((i) => i.productId)
      .filter((id): id is string => Boolean(id));
    const variantIds = dto.items
      .map((i) => i.variantId)
      .filter((id): id is string => Boolean(id));

    const products =
      productIds.length > 0
        ? await this.prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, vendorId: true, sku: true },
          })
        : [];

    const variants =
      variantIds.length > 0
        ? await this.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            select: {
              id: true,
              productId: true,
              sku: true,
              weight: true,
              packSize: true,
              flavour: true,
            },
          })
        : [];

    const vendorByProduct = new Map(
      products.map((p) => [p.id, p.vendorId])
    );
    const skuByProduct = new Map(products.map((p) => [p.id, p.sku]));
    const variantById = new Map(variants.map((variant) => [variant.id, variant]));

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: customerId ?? null,
        customerName: dto.customerName.trim(),
        customerEmail: dto.customerEmail.trim().toLowerCase(),
        customerPhone: dto.customerPhone?.trim() ?? "",
        shippingAddress: dto.shippingAddress?.trim() ?? "",
        shippingFee,
        deliveryCity: dto.deliveryCity?.trim() ?? "",
        deliveryLatitude: dto.deliveryLatitude ?? null,
        deliveryLongitude: dto.deliveryLongitude ?? null,
        paymentMethod,
        currency,
        carrier: "Kwik",
        total,
        itemCount,
        estimatedDelivery: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        )
          .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        items: {
          create: orderItems.map((item) => {
            const variant = item.variantId
              ? variantById.get(item.variantId)
              : undefined;
            const productId = item.productId ?? variant?.productId ?? null;
            const variantLabel =
              item.variantLabel?.trim() ||
              (variant
                ? [variant.flavour, variant.packSize && variant.weight
                    ? `${variant.packSize} x ${variant.weight}`
                    : variant.weight || variant.packSize]
                    .filter(Boolean)
                    .join(" · ")
                : "");

            return {
              name: item.name,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              image: item.image,
              productId,
              variantId: variant?.id ?? null,
              variantLabel,
              vendorId: productId
                ? (vendorByProduct.get(productId) ?? null)
                : null,
              sku:
                variant?.sku ||
                (productId ? skuByProduct.get(productId) : "") ||
                productId?.slice(0, 8).toUpperCase() ||
                "",
            };
          }),
        },
      },
      include: { items: true },
    });

    return {
      order: this.formatListOrder(order),
      orderNumber: formatOrderNumber(order.orderNumber),
      paymentMethod: order.paymentMethod,
      currency: order.currency,
      total: order.total,
      shippingFee: order.shippingFee,
    };
  }

  async findOrderEntityByNumber(orderNumber: string) {
    const normalized = parseOrderNumber(orderNumber);
    const order = await this.prisma.order.findUnique({
      where: { orderNumber: normalized },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException("Order not found.");
    }

    return order;
  }

  async findOrderByPaymentReference(reference: string) {
    return this.prisma.order.findUnique({
      where: { paymentReference: reference },
      include: { items: true },
    });
  }

  async attachPaymentReference(
    orderId: string,
    data: { paymentReference: string; paymentMethod: string }
  ) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentReference: data.paymentReference,
        paymentMethod: data.paymentMethod,
      },
      include: { items: true },
    });
  }

  async markOrderPaid(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        paidAt: new Date(),
        status: OrderStatus.PROCESSING,
      },
      include: { items: true },
    });
  }

  async markPaymentFailed(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
      },
      include: { items: true },
    });
  }

  async attachDeliveryDetails(
    orderId: string,
    data: {
      trackingNumber: string;
      kwikTrackingUrl: string;
      estimatedDelivery: string;
      status: OrderStatus;
    }
  ) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        trackingNumber: data.trackingNumber,
        kwikTrackingUrl: data.kwikTrackingUrl,
        estimatedDelivery: data.estimatedDelivery,
        status: data.status,
      },
      include: { items: true },
    });
  }

  async updateOrderStatusInternal(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });
  }

  async listSupportOrderLookups() {
    const orders = await this.prisma.order.findMany({
      orderBy: { orderDate: "desc" },
      take: 50,
    });

    return orders.map((order) => ({
      id: formatOrderNumber(order.orderNumber),
      customer: order.customerName,
      email: order.customerEmail,
      date: formatOrderDate(order.orderDate),
      status: toClientOrderStatus(order.status),
      total: order.total,
    }));
  }
}
