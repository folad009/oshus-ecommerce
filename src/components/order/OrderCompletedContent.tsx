"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  loadCompletedOrder,
  type CompletedOrderSnapshot,
} from "@/lib/completed-order-storage";
import { OrderInfoBanner } from "@/components/order/OrderInfoBanner";
import { OrderDetailsCard } from "@/components/order/OrderDetailsCard";

export function OrderCompletedContent() {
  const [order, setOrder] = useState<CompletedOrderSnapshot | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrder(loadCompletedOrder());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <p className="text-sm text-muted-foreground text-center py-12">
        Loading order details...
      </p>
    );
  }

  if (!order) {
    return (
      <section className="py-12 text-center px-4">
        <p className="text-sm text-muted-foreground mb-4">
          No recent order found. Place an order to see confirmation details here.
        </p>
        <Link href="/shop" className="text-sm font-semibold text-forest underline">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <>
      <OrderInfoBanner order={order} />
      <OrderDetailsCard order={order} />
    </>
  );
}
