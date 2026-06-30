import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import type { RawBodyRequest } from "@nestjs/common";
import type { Request } from "express";
import { InitializePaymentDto, VerifyPaymentDto } from "./dto/payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initialize")
  initialize(@Body() body: InitializePaymentDto) {
    return this.paymentsService.initializePayment(
      body.orderNumber,
      body.provider
    );
  }

  @Get("verify")
  verify(@Query() query: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(query.reference, query.provider);
  }

  @Post("webhooks/paystack")
  paystackWebhook(@Req() request: RawBodyRequest<Request>) {
    const signature = request.headers["x-paystack-signature"];
    const rawBody = request.rawBody;

    if (!rawBody) {
      throw new UnauthorizedException("Missing webhook body.");
    }

    return this.paymentsService.handlePaystackWebhook(
      rawBody,
      typeof signature === "string" ? signature : undefined
    );
  }

  @Post("webhooks/opay")
  opayWebhook(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleOpayWebhook(body);
  }
}
