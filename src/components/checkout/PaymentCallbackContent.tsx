"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadPendingCheckout, clearPendingCheckout } from "@/lib/pending-checkout-storage";
import { saveCompletedOrder } from "@/lib/completed-order-storage";
import { useCart } from "@/store/cart-provider";

export function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const reference =
      searchParams.get("reference") ?? searchParams.get("trxref");
    const provider = searchParams.get("provider") ?? "paystack";

    if (!reference) {
      setMessage("Missing payment reference.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `/api/payments/verify?reference=${encodeURIComponent(reference!)}&provider=${encodeURIComponent(provider)}`
        );
        const data = (await res.json()) as {
          error?: string;
          success?: boolean;
          orderNumber?: string;
          total?: number;
          customerName?: string;
          customerEmail?: string;
          trackingNumber?: string;
        };

        if (!res.ok || !data.success) {
          setMessage(data.error ?? "Payment verification failed.");
          return;
        }

        const pending = loadPendingCheckout();
        if (pending) {
          saveCompletedOrder({
            orderNumber: data.orderNumber ?? pending.orderNumber,
            customerName: data.customerName ?? pending.customerName,
            customerEmail: data.customerEmail ?? pending.customerEmail,
            items: pending.items,
            subtotal: pending.subtotal,
            shipping: pending.shipping,
            taxes: pending.taxes,
            couponDiscount: pending.couponDiscount,
            total: data.total ?? pending.total,
            placedAt: new Date().toISOString(),
          });
          clearPendingCheckout();
        }

        clearCart();

        router.replace(
          `/order-completed?order=${encodeURIComponent(data.orderNumber ?? "")}`
        );
      } catch {
        setMessage("Could not verify payment. Please contact support.");
      }
    }

    void verify();
  }, [searchParams, router, clearCart]);

  return (
    <section className="py-16 text-center px-4">
      <p className="text-sm text-muted-foreground">{message}</p>
    </section>
  );
}
