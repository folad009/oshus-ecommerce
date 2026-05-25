import type { ShopProduct } from "@/types";

export type ProductApprovalStatus = "pending" | "approved" | "rejected";

export interface CatalogProduct {
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
    rating: product.rating,
    discount: product.discount,
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
