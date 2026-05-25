import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { JwtPayload } from "../auth/auth.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductStatusDto } from "./dto/update-product-status.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("shop")
  listShopProducts() {
    return this.productsService
      .listApprovedShopProducts()
      .then((products) => ({ products }));
  }

  @Get("vendor")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  listVendorProducts(@Req() request: Request & { user: JwtPayload }) {
    return this.productsService
      .listVendorProducts(request.user.sub)
      .then((products) => ({ products }));
  }

  @Post("vendor")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  createVendorProduct(
    @Req() request: Request & { user: JwtPayload },
    @Body() body: CreateProductDto
  ) {
    return this.productsService
      .createVendorProduct(request.user.sub, body)
      .then((product) => ({
        product,
        message:
          "Product submitted for admin approval. It will appear in the store once approved.",
      }));
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  listAdminProducts() {
    return this.productsService
      .listAdminProducts()
      .then((products) => ({ products }));
  }

  @Patch("admin/:id/status")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateStatus(
    @Param("id") id: string,
    @Body() body: UpdateProductStatusDto
  ) {
    return this.productsService
      .updateProductStatus(id, body.status)
      .then((product) => ({ product }));
  }
}
