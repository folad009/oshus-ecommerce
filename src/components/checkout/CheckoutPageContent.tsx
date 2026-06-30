"use client";

import { useState } from "react";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { CheckoutEmptyGuard } from "@/components/checkout/CheckoutEmptyGuard";

export function CheckoutPageContent() {
  const [shippingFee, setShippingFee] = useState(0);

  return (
    <CheckoutEmptyGuard>
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="flex-1 min-w-0">
              <PaymentMethods
                shippingFee={shippingFee}
                onShippingFeeChange={setShippingFee}
              />
            </div>
            <div className="w-full lg:w-[320px] shrink-0">
              <CheckoutOrderSummary shippingFee={shippingFee} />
            </div>
          </div>
        </div>
      </section>
    </CheckoutEmptyGuard>
  );
}
