import { cache } from "react";
import type { Category, Product, ShopProduct } from "@/types";
import type { ShopCategory } from "@/data/shop-categories";
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

export const getApprovedShopProducts = cache(
  async (): Promise<ShopProduct[]> => {
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
);

export const getShopCategoryRecords = cache(
  async (): Promise<ShopCategory[]> => {
    try {
      const response = await backendFetch("/categories");
      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as {
        categories?: ShopCategory[];
      };
      return data.categories ?? [];
    } catch {
      return [];
    }
  }
);

export async function getShopCategories(): Promise<string[]> {
  const categories = await getShopCategoryRecords();
  return categories.map((category) => category.name);
}

export function buildSidebarCategories(
  shopProducts: ShopProduct[],
  categoryRecords: ShopCategory[]
): Category[] {
  const countForCategory = (name: string) =>
    shopProducts.filter((product) => product.category === name).length;

  const imageForCategory = (name: string) =>
    shopProducts.find((product) => product.category === name)?.image ?? "";

  if (categoryRecords.length > 0) {
    return categoryRecords.map((category) => ({
      id: category.id,
      name: category.name,
      image: imageForCategory(category.name),
      productCount: countForCategory(category.name),
    }));
  }

  const names = [...new Set(shopProducts.map((product) => product.category))];
  return names.map((name) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    image: imageForCategory(name),
    productCount: countForCategory(name),
  }));
}

export async function getShopProductById(
  id: string
): Promise<ShopProduct | undefined> {
  const products = await getApprovedShopProducts();
  return products.find((product) => product.id === id);
}
