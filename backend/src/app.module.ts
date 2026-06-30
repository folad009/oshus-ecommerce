import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";
import { ProductsModule } from "./products/products.module";
import { ShippingModule } from "./shipping/shipping.module";
import { StaffModule } from "./staff/staff.module";
import { TicketsModule } from "./tickets/tickets.module";
import { UploadsModule } from "./uploads/uploads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StaffModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    ShippingModule,
    UploadsModule,
    TicketsModule,
    DashboardModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
