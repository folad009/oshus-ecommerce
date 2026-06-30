import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ProductStatus, Role } from "@prisma/client";
import { CategoriesService } from "../categories/categories.service";
import { computeDiscount } from "../common/product-utils";
import { PrismaService } from "../prisma/prisma.service";
import { AdminCreateProductDto } from "./dto/admin-create-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { resolveProductImages } from "./product-images.util";

function formatProduct(product: {
  id: string;
  vendorEmail: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
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
    images: product.images.length > 0 ? product.images : [product.image],
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
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService
  ) {}

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

  private async resolveCategory(name: string) {
    try {
      return await this.categoriesService.assertValidCategory(name);
    } catch {
      throw new UnprocessableEntityException("Invalid category.");
    }
  }

  async createVendorProduct(vendorId: string, dto: CreateProductDto) {
    const vendor = await this.findVendor(vendorId);
    const category = await this.resolveCategory(dto.category);

    const price = Math.round(dto.price);
    const originalPrice = Math.round(dto.originalPrice);
    const { image, images } = resolveProductImages(dto);

    const product = await this.prisma.product.create({
      data: {
        vendorId: vendor.id,
        name: dto.name.trim(),
        category,
        price,
        originalPrice,
        image,
        images,
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

  async createAdminProduct(dto: AdminCreateProductDto) {
    let vendorId: string;

    if (dto.vendorEmail) {
      const vendor = await this.prisma.user.findUnique({
        where: { email: dto.vendorEmail.trim().toLowerCase() },
      });

      if (!vendor || vendor.role !== Role.VENDOR) {
        throw new NotFoundException("Vendor not found.");
      }

      vendorId = vendor.id;
    } else {
      const vendor = await this.prisma.user.findFirst({
        where: { role: Role.VENDOR },
        orderBy: { createdAt: "asc" },
      });

      if (!vendor) {
        throw new NotFoundException(
          "No vendor account found. Provide a vendor email."
        );
      }

      vendorId = vendor.id;
    }

    const category = await this.resolveCategory(dto.category);

    const price = Math.round(dto.price);
    const originalPrice = Math.round(dto.originalPrice);
    const { image, images } = resolveProductImages(dto);

    const product = await this.prisma.product.create({
      data: {
        vendorId,
        name: dto.name.trim(),
        category,
        price,
        originalPrice,
        image,
        images,
        stock: Math.max(0, Math.round(dto.stock)),
        discount: computeDiscount(price, originalPrice),
        status: ProductStatus.APPROVED,
        reviewedAt: new Date(),
        rating: 4.5,
      },
      include: { vendor: { select: { email: true } } },
    });

    return formatProduct({
      ...product,
      vendorEmail: product.vendor.email,
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { id },
      include: { vendor: { select: { email: true } } },
    });

    if (!existing) {
      throw new NotFoundException("Product not found.");
    }

    let category: string | undefined;
    if (dto.category !== undefined) {
      category = await this.resolveCategory(dto.category);
    }

    const price = dto.price !== undefined ? Math.round(dto.price) : existing.price;
    const originalPrice =
      dto.originalPrice !== undefined
        ? Math.round(dto.originalPrice)
        : existing.originalPrice;

    const imageUpdate =
      dto.images !== undefined || dto.image !== undefined
        ? resolveProductImages({
            image: dto.image ?? existing.image,
            images: dto.images ?? existing.images,
          })
        : null;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(dto.price !== undefined ? { price } : {}),
        ...(dto.originalPrice !== undefined ? { originalPrice } : {}),
        ...(imageUpdate
          ? { image: imageUpdate.image, images: imageUpdate.images }
          : {}),
        ...(dto.stock !== undefined
          ? { stock: Math.max(0, Math.round(dto.stock)) }
          : {}),
        ...(dto.price !== undefined || dto.originalPrice !== undefined
          ? { discount: computeDiscount(price, originalPrice) }
          : {}),
      },
      include: { vendor: { select: { email: true } } },
    });

    return formatProduct({
      ...product,
      vendorEmail: product.vendor.email,
    });
  }

  async deleteProduct(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException("Product not found.");
    }

    await this.prisma.product.delete({ where: { id } });

    return { message: "Product deleted." };
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
      images: product.images.length > 0 ? product.images : [product.image],
      rating: product.rating,
      discount: product.discount,
    }));
  }
}
