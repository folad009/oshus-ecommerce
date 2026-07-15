import type { ProductVariant, ShopProduct } from "@/types";

export type ProductApprovalStatus = "pending" | "approved" | "rejected";

export type AdditionalInfoRow = { label: string; value: string };

export interface CatalogProduct {
  id: string;
  vendorEmail: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  sku: string;
  shortDescription: string;
  description: string[];
  descriptionBullets: string[];
  tags: string[];
  sizes: string[];
  variants?: ProductVariant[];
  additionalInfo: AdditionalInfoRow[];
  inStock: boolean;
  rating: number;
  discount: string;
  stock: number;
  status: ProductApprovalStatus;
  submittedAt: string;
  reviewedAt?: string;
}

export const productApprovalStatusStyles: Record<
  ProductApprovalStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending approval",
    className: "bg-amber-100 text-amber-800",
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800",
  },
};

export function catalogToShopProduct(product: CatalogProduct): ShopProduct {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    images: product.images,
    rating: product.rating,
    discount: product.discount,
    stock: product.stock,
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: product.description,
    descriptionBullets: product.descriptionBullets,
    tags: product.tags,
    sizes: product.sizes,
    variants: product.variants,
    additionalInfo: product.additionalInfo,
    inStock: product.inStock,
  };
}

export function computeDiscount(
  price: number,
  originalPrice: number
): string {
  if (originalPrice <= price) {
    return "";
  }
  const percent = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );
  return `${percent}% off`;
}
