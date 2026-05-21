import type { Metadata } from "next";
import { CartPageHeader } from "@/components/cart/CartPageHeader";
import { CartPageContent } from "@/components/cart/CartPageContent";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { CartNewsletter } from "@/components/cart/CartNewsletter";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shopping Cart | Oshus Store",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <CartPageHeader />
        <CartPageContent />
        <ShopFeaturesBar iconVariant="yellow" />
        <CartNewsletter />
      </main>
      <Footer />
    </>
  );
}
