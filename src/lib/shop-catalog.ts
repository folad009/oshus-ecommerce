import { shopProducts } from "@/data/shop";
import { backendFetch } from "@/lib/backend";
import type { ShopProduct } from "@/types";

export async function getApprovedVendorProducts(): Promise<ShopProduct[]> {
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

export async function getApprovedShopProducts(): Promise<ShopProduct[]> {
  const approvedVendor = await getApprovedVendorProducts();
  return [...shopProducts, ...approvedVendor];
}

export async function getShopProductById(
  id: string
): Promise<ShopProduct | undefined> {
  const products = await getApprovedShopProducts();
  return products.find((product) => product.id === id);
}
