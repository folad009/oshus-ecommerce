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
    sku: base.sku || `SKU-${id.slice(0, 8).toUpperCase()}`,
    tags: base.tags && base.tags.length > 0 ? base.tags : [base.category],
    sizes: base.sizes && base.sizes.length > 0 ? base.sizes : ["Standard"],
    images: galleryImages,
    inStock: base.inStock ?? (base.stock ?? 0) > 0,
    shortDescription:
      base.shortDescription ||
      "Premium quality product crafted for everyday use with visible results.",
    description:
      base.description && base.description.length > 0
        ? base.description
        : [
            "This product is made with carefully selected ingredients to deliver effective results you can see and feel.",
            "Suitable for regular use as part of your daily routine.",
          ],
    descriptionBullets:
      base.descriptionBullets && base.descriptionBullets.length > 0
        ? base.descriptionBullets
        : [
            "High-quality ingredients",
            "Easy to use daily",
            "Suitable for all skin types",
          ],
    additionalInfo:
      base.additionalInfo && base.additionalInfo.length > 0
        ? base.additionalInfo
        : [
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
