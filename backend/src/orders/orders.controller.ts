import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { JwtPayload } from "../auth/auth.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body() body: CreateOrderDto,
    @Req() request: Request & { user?: JwtPayload }
  ) {
    return this.ordersService.createOrder(body, request.user?.sub);
  }

  @Get("track")
  trackOrder(
    @Query("orderNumber") orderNumber: string,
    @Query("email") email?: string
  ) {
    return this.ordersService.lookupOrder(orderNumber, email);
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  listAdmin() {
    return this.ordersService
      .listAdminOrders()
      .then((orders) => ({ orders }));
  }

  @Get("admin/:slug")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAdminDetail(@Param("slug") slug: string) {
    return this.ordersService.getOrderDetail(slug);
  }

  @Patch("admin/:slug/status")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateAdminStatus(
    @Param("slug") slug: string,
    @Body() body: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(slug, body.status);
  }

  @Get("vendor")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  listVendor(@Req() request: Request & { user: JwtPayload }) {
    return this.ordersService
      .listVendorOrders(request.user.sub)
      .then((orders) => ({ orders }));
  }

  @Get("vendor/:slug")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  getVendorDetail(@Param("slug") slug: string) {
    return this.ordersService.getOrderDetail(slug);
  }

  @Get("support")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPORT)
  listSupport() {
    return this.ordersService
      .listSupportOrderLookups()
      .then((orders) => ({ orders }));
  }

  @Get("support/:slug")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPORT)
  getSupportDetail(@Param("slug") slug: string) {
    return this.ordersService.getOrderDetail(slug);
  }
}
