import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentCallbackContent } from "@/components/checkout/PaymentCallbackContent";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Payment | Oshus Store",
  description: "Confirming your payment.",
};

export default function PaymentCallbackPage() {
  return (
    <>
      <main className="flex-1 bg-white min-h-[50vh]">
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground text-center py-16">
              Verifying payment...
            </p>
          }
        >
          <PaymentCallbackContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
