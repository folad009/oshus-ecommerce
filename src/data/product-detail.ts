import type { ProductDetail, ShopProduct } from "@/types";
import { shopProducts } from "@/data/shop";

const serumImages = [
  "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=800&h=900&fit=crop",
  "https://images.unsplash.com/photo-1570194065595-8c2a7a0e2b0d?w=800&h=900&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=900&fit=crop",
  "https://images.unsplash.com/photo-1596755389378-c9b2a0c1f8c2?w=800&h=900&fit=crop",
];

interface ProductDetailExtras {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  tags?: string[];
  sizes?: string[];
  images?: string[];
  inStock?: boolean;
  shortDescription?: string;
  description?: string[];
  descriptionBullets?: string[];
  additionalInfo?: { label: string; value: string }[];
}

const productDetailsMap: Record<string, ProductDetailExtras> = {
  "shop-1": {
    name: "SilkSkin Serum",
    price: 48_000,
    originalPrice: 60_000,
    rating: 4.8,
    reviewCount: 245,
    sku: "GRFR85648HGJ",
    tags: ["Skincare", "Serums", "Vitamin C"],
    sizes: ["30 ml", "60ml", "80ml", "100ml"],
    images: serumImages,
    inStock: true,
    shortDescription:
      "A lightweight vitamin-rich serum that brightens, hydrates, and restores your skin's natural glow.",
    description: [
      "SilkSkin Serum is formulated with a powerful blend of vitamin C, hyaluronic acid, and botanical extracts to deliver deep hydration while improving skin tone and texture.",
      "Designed for daily use, this fast-absorbing formula works on all skin types and layers beautifully under moisturizer or sunscreen.",
    ],
    descriptionBullets: [
      "Brightens dull skin and evens tone",
      "Deeply hydrates without a greasy finish",
      "Reduces the appearance of fine lines",
      "Dermatologist tested and cruelty-free",
    ],
    additionalInfo: [
      { label: "Weight", value: "30 ml / 1 fl oz" },
      { label: "Ingredients", value: "Vitamin C, Hyaluronic Acid, Aloe Vera" },
      { label: "Skin Type", value: "All skin types" },
      { label: "Country of Origin", value: "USA" },
    ],
  },
};

function buildProductDetail(id: string): ProductDetail | undefined {
  const base = shopProducts.find((p) => p.id === id);
  if (!base) return undefined;

  const extra = productDetailsMap[id];
  const images = extra?.images ?? [base.image, base.image, base.image, base.image];

  return {
    ...base,
    name: extra?.name ?? base.name,
    price: extra?.price ?? base.price,
    originalPrice: extra?.originalPrice ?? base.originalPrice,
    rating: extra?.rating ?? base.rating,
    reviewCount: extra?.reviewCount ?? 128,
    sku: extra?.sku ?? `SKU-${id.toUpperCase()}`,
    tags: extra?.tags ?? [base.category],
    sizes: extra?.sizes ?? ["30 ml", "60ml"],
    images,
    inStock: extra?.inStock ?? true,
    shortDescription:
      extra?.shortDescription ??
      "Premium quality product crafted for everyday use with visible results.",
    description: extra?.description ?? [
      "This product is made with carefully selected ingredients to deliver effective results you can see and feel.",
      "Suitable for regular use as part of your daily routine.",
    ],
    descriptionBullets: extra?.descriptionBullets ?? [
      "High-quality ingredients",
      "Easy to use daily",
      "Suitable for all skin types",
    ],
    additionalInfo: extra?.additionalInfo ?? [
      { label: "Category", value: base.category },
      { label: "Brand", value: "Oshus Store" },
    ],
  };
}

export function getProductDetail(id: string): ProductDetail | undefined {
  return buildProductDetail(id);
}

export function getRelatedProducts(
  currentId: string,
  category: string,
  limit = 4
): ShopProduct[] {
  return shopProducts
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}
