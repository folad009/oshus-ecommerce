import { HeroSection } from "@/components/HeroSection";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SpecialOfferSection } from "@/components/SpecialOfferSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesSection } from "@/components/CategoriesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <CategoryTabs />
        <SpecialOfferSection />
        <FeaturedProducts />
        <CategoriesSection />
      </main>
      <Footer />
    </>
  );
}
