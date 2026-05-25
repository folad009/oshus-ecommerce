import type { Metadata } from "next";
import { ShopPageHeader } from "@/components/shop/ShopPageHeader";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { Footer } from "@/components/Footer";
import { getApprovedShopProducts } from "@/lib/shop-catalog";

export const metadata: Metadata = {
  title: "Shop | Oshus Store",
  description:
    "Browse our curated collection of premium skin care, makeup, hair care, and wellness products.",
};

export default async function ShopPage() {
  const products = await getApprovedShopProducts();

  return (
    <>
      <main className="flex-1 bg-white">
        <ShopPageHeader />
        <ShopPageContent products={products} />
        <ShopFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
