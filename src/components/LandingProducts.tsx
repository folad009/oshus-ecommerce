import { LandingProductsClient } from "@/components/LandingProductsClient";
import {
  buildSidebarCategories,
  getApprovedShopProducts,
  getShopCategoryRecords,
  shopProductToProduct,
} from "@/lib/shop-catalog";

export async function LandingProducts() {
  const [shopProducts, categoryRecords] = await Promise.all([
    getApprovedShopProducts(),
    getShopCategoryRecords(),
  ]);

  const products = shopProducts.map(shopProductToProduct);
  const categoryTabs =
    categoryRecords.length > 0
      ? categoryRecords.map((category) => category.name)
      : [...new Set(products.map((product) => product.category))];

  const featuredProducts = [...shopProducts].sort(
    (a, b) => b.rating - a.rating
  );

  const sidebarCategories = buildSidebarCategories(
    shopProducts,
    categoryRecords
  );

  return (
    <LandingProductsClient
      products={products}
      featuredProducts={featuredProducts}
      categoryTabs={categoryTabs}
      sidebarCategories={sidebarCategories}
    />
  );
}
