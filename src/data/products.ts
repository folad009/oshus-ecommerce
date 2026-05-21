import type { Product, ShopProduct } from "@/types";
import { shopProducts } from "@/data/shop";

function shopToProduct(shop: ShopProduct): Product {
  return {
    id: shop.id,
    name: shop.name,
    price: shop.price,
    originalPrice: shop.originalPrice,
    image: shop.image,
    category: shop.category,
    rating: shop.rating,
    badge: shop.discount,
  };
}

export const products: Product[] = shopProducts.slice(0, 8).map(shopToProduct);

export const specialProducts: Product[] = shopProducts
  .slice(0, 4)
  .map(shopToProduct);
