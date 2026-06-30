import type { ProductDetail, ShopProduct } from "@/types";
import { getShopProductById } from "@/lib/shop-catalog";

async function buildProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  const base = await getShopProductById(id);
  if (!base) return undefined;

  const galleryImages =
    base.images && base.images.length > 0
      ? base.images.slice(0, 4)
      : [base.image];

  return {
    ...base,
    reviewCount: 128,
    sku: `SKU-${id.slice(0, 8).toUpperCase()}`,
    tags: [base.category],
    sizes: ["Standard"],
    images: galleryImages,
    inStock: true,
    shortDescription:
      "Premium quality product crafted for everyday use with visible results.",
    description: [
      "This product is made with carefully selected ingredients to deliver effective results you can see and feel.",
      "Suitable for regular use as part of your daily routine.",
    ],
    descriptionBullets: [
      "High-quality ingredients",
      "Easy to use daily",
      "Suitable for all skin types",
    ],
    additionalInfo: [
      { label: "Category", value: base.category },
      { label: "Brand", value: "Oshus Store" },
    ],
  };
}

export async function getProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  return buildProductDetail(id);
}

export async function getRelatedProducts(
  currentId: string,
  category: string,
  limit = 4
): Promise<ShopProduct[]> {
  const { getApprovedShopProducts } = await import("@/lib/shop-catalog");
  const products = await getApprovedShopProducts();
  return products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}
