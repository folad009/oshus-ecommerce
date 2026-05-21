import type { Metadata } from "next";
import { TrackOrderPageHeader } from "@/components/track-order/TrackOrderPageHeader";
import { OrderStatusTimeline } from "@/components/track-order/OrderStatusTimeline";
import { TrackOrderProducts } from "@/components/track-order/TrackOrderProducts";
import { TrackOrderFeaturesBar } from "@/components/track-order/TrackOrderFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Track Your Order | Oshus Store",
  description: "Track the status of your order in real time.",
};

export default function TrackOrderPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <TrackOrderPageHeader />
        <section className="py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
            <OrderStatusTimeline />
            <TrackOrderProducts />
          </div>
        </section>
        <TrackOrderFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
