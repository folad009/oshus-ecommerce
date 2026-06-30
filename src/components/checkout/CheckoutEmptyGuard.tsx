"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart-provider";

export function CheckoutEmptyGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { items, hydrated } = useCart();

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, router]);

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground py-12 text-center">
        Loading checkout...
      </p>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return <>{children}</>;
}
