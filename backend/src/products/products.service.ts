import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ProductStatus, Role } from "@prisma/client";
import { computeDiscount } from "../common/product-utils";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";

const SHOP_CATEGORIES = [
  "Skin Care",
  "Makeup",
  "Hair Care",
  "Fragrances",
  "Nail Care",
  "Body Care",
] as const;

function formatProduct(product: {
  id: string;
  vendorEmail: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  discount: string;
  stock: number;
  status: ProductStatus;
  submittedAt: Date;
  reviewedAt: Date | null;
}) {
  const statusMap: Record<ProductStatus, "pending" | "approved" | "rejected"> =
    {
      [ProductStatus.PENDING]: "pending",
      [ProductStatus.APPROVED]: "approved",
      [ProductStatus.REJECTED]: "rejected",
    };

  return {
    id: product.id,
    vendorEmail: product.vendorEmail,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    rating: product.rating,
    discount: product.discount,
    stock: product.stock,
    status: statusMap[product.status],
    submittedAt: product.submittedAt.toISOString().slice(0, 10),
    reviewedAt: product.reviewedAt?.toISOString().slice(0, 10),
  };
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findVendor(vendorId: string) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.role !== Role.VENDOR) {
      throw new NotFoundException("Vendor not found.");
    }

    return vendor;
  }

  async listVendorProducts(vendorId: string) {
    await this.findVendor(vendorId);

    const products = await this.prisma.product.findMany({
      where: { vendorId },
      orderBy: { submittedAt: "desc" },
      include: { vendor: { select: { email: true } } },
    });

    return products.map((product) =>
      formatProduct({
        ...product,
        vendorEmail: product.vendor.email,
      })
    );
  }

  async createVendorProduct(vendorId: string, dto: CreateProductDto) {
    const vendor = await this.findVendor(vendorId);

    if (
      !SHOP_CATEGORIES.includes(
        dto.category as (typeof SHOP_CATEGORIES)[number]
      )
    ) {
      throw new UnprocessableEntityException("Invalid category.");
    }

    const price = Math.round(dto.price);
    const originalPrice = Math.round(dto.originalPrice);

    const product = await this.prisma.product.create({
      data: {
        vendorId: vendor.id,
        name: dto.name.trim(),
        category: dto.category.trim(),
        price,
        originalPrice,
        image: dto.image.trim(),
        stock: Math.max(0, Math.round(dto.stock)),
        discount: computeDiscount(price, originalPrice),
        status: ProductStatus.PENDING,
      },
      include: { vendor: { select: { email: true } } },
    });

    return formatProduct({
      ...product,
      vendorEmail: product.vendor.email,
    });
  }

  async listAdminProducts() {
    const products = await this.prisma.product.findMany({
      orderBy: { submittedAt: "desc" },
      include: { vendor: { select: { email: true } } },
    });

    return products.map((product) =>
      formatProduct({
        ...product,
        vendorEmail: product.vendor.email,
      })
    );
  }

  async updateProductStatus(id: string, status: "approved" | "rejected") {
    const existing = await this.prisma.product.findUnique({
      where: { id },
      include: { vendor: { select: { email: true } } },
    });

    if (!existing) {
      throw new NotFoundException("Product not found.");
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        status:
          status === "approved"
            ? ProductStatus.APPROVED
            : ProductStatus.REJECTED,
        reviewedAt: new Date(),
        ...(status === "approved" && existing.rating === 0
          ? { rating: 4.5 }
          : {}),
      },
      include: { vendor: { select: { email: true } } },
    });

    return formatProduct({
      ...product,
      vendorEmail: product.vendor.email,
    });
  }

  async listApprovedShopProducts() {
    const products = await this.prisma.product.findMany({
      where: { status: ProductStatus.APPROVED },
      orderBy: { submittedAt: "desc" },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      discount: product.discount,
    }));
  }
}
