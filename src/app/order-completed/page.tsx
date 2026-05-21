import type { Metadata } from "next";
import { OrderCompletedPageHeader } from "@/components/order/OrderCompletedPageHeader";
import { OrderSuccessSection } from "@/components/order/OrderSuccessSection";
import { OrderInfoBanner } from "@/components/order/OrderInfoBanner";
import { OrderDetailsCard } from "@/components/order/OrderDetailsCard";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { OrderCompletedNewsletter } from "@/components/order/OrderCompletedNewsletter";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Order Completed | Oshus Store",
  description: "Your order has been placed successfully.",
};

export default function OrderCompletedPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <OrderCompletedPageHeader />
        <OrderSuccessSection />
        <OrderInfoBanner />
        <OrderDetailsCard />
        <ShopFeaturesBar iconVariant="yellow" />
        <OrderCompletedNewsletter />
      </main>
      <Footer />
    </>
  );
}
