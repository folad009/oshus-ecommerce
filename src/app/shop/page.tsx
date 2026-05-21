import type { Metadata } from "next";
import { ShopPageHeader } from "@/components/shop/ShopPageHeader";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop | Oshus Store",
  description:
    "Browse our curated collection of premium skin care, makeup, hair care, and wellness products.",
};

export default function ShopPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <ShopPageHeader />
        <ShopPageContent />
        <ShopFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
