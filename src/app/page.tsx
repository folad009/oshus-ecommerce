import { HeroSection } from "@/components/HeroSection";
import { LandingProducts } from "@/components/LandingProducts";
import { Footer } from "@/components/Footer";
import { getApprovedShopProducts } from "@/lib/shop-catalog";

export default async function Home() {
  const shopProducts = await getApprovedShopProducts();

  return (
    <>
      <main className="flex-1">
        <HeroSection
          productImages={shopProducts.slice(0, 3).map((product) => product.image)}
        />
        <LandingProducts />
      </main>
      <Footer />
    </>
  );
}
