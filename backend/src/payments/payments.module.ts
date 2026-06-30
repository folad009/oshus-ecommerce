import { Module } from "@nestjs/common";
import { OrdersModule } from "../orders/orders.module";
import { ShippingModule } from "../shipping/shipping.module";
import { OpayService } from "./opay.service";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { PaystackService } from "./paystack.service";

@Module({
  imports: [OrdersModule, ShippingModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaystackService, OpayService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
