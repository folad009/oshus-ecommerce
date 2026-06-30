import type { Product, ShopProduct } from "@/types";
import { backendFetch } from "@/lib/backend";

export function shopProductToProduct(shop: ShopProduct): Product {
  return {
    id: shop.id,
    name: shop.name,
    price: shop.price,
    originalPrice: shop.originalPrice,
    image: shop.image,
    category: shop.category,
    rating: shop.rating,
    badge: shop.discount || undefined,
  };
}

export async function getApprovedShopProducts(): Promise<ShopProduct[]> {
  try {
    const response = await backendFetch("/products/shop");
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { products?: ShopProduct[] };
    return data.products ?? [];
  } catch {
    return [];
  }
}

export async function getShopCategories(): Promise<string[]> {
  try {
    const response = await backendFetch("/categories");
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as {
      categories?: Array<{ name: string }>;
    };
    return (data.categories ?? []).map((category) => category.name);
  } catch {
    return [];
  }
}

export async function getShopProductById(
  id: string
): Promise<ShopProduct | undefined> {
  const products = await getApprovedShopProducts();
  return products.find((product) => product.id === id);
}
