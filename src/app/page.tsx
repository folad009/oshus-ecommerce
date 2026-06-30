import { HeroSection } from "@/components/HeroSection";
import { LandingProducts } from "@/components/LandingProducts";
import { Footer } from "@/components/Footer";
import {
  getApprovedShopProducts,
  getShopCategories,
  shopProductToProduct,
} from "@/lib/shop-catalog";

export default async function Home() {
  const [shopProducts, categories] = await Promise.all([
    getApprovedShopProducts(),
    getShopCategories(),
  ]);

  const products = shopProducts.map(shopProductToProduct);
  const categoryNames =
    categories.length > 0
      ? categories
      : [...new Set(products.map((product) => product.category))];

  const featuredProducts = [...shopProducts].sort(
    (a, b) => b.rating - a.rating
  );

  return (
    <>
      <main className="flex-1">
        <HeroSection
          productImages={shopProducts.slice(0, 3).map((product) => product.image)}
        />
        <LandingProducts
          products={products}
          featuredProducts={featuredProducts}
          categories={categoryNames}
        />
      </main>
      <Footer />
    </>
  );
}
