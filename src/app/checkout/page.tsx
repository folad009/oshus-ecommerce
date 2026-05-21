import type { Metadata } from "next";
import { CheckoutPageHeader } from "@/components/checkout/CheckoutPageHeader";
import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { CartNewsletter } from "@/components/cart/CartNewsletter";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkout | Oshus Store",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <CheckoutPageHeader />
        <CheckoutPageContent />
        <ShopFeaturesBar iconVariant="yellow" />
        <CartNewsletter />
      </main>
      <Footer />
    </>
  );
}
