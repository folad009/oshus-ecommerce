import { Module } from "@nestjs/common";
import { ShippingController } from "./shipping.controller";
import { KwikService } from "./kwik.service";

@Module({
  controllers: [ShippingController],
  providers: [KwikService],
  exports: [KwikService],
})
export class ShippingModule {}
