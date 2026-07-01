"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/currency";
import type { CompletedOrderSnapshot } from "@/lib/completed-order-storage";

interface OrderDetailsCardProps {
  order: CompletedOrderSnapshot;
}

export function OrderDetailsCard({ order }: OrderDetailsCardProps) {
  const { items, shipping, taxes, couponDiscount, total, currency = "NGN" } =
    order;
  const format = (amount: number) => formatCurrency(amount, currency);

  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-base font-bold text-foreground mb-6">Order Details</h2>

        <div className="hidden sm:grid sm:grid-cols-[1fr_auto] gap-4 pb-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <span>Products</span>
          <span className="text-right">Sub Total</span>
        </div>

        <div className="flex flex-col">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-14 rounded-lg overflow-hidden shrink-0 bg-light-gray">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.category} × {item.quantity}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground shrink-0">
                {format(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3 max-w-xs ml-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-foreground">
              {shipping === 0 ? "Free" : format(shipping)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Taxes</span>
            <span className="font-medium text-foreground">{format(taxes)}</span>
          </div>
          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Coupon Discount</span>
              <span className="font-medium text-forest">
                -{format(couponDiscount)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-base font-bold text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              {format(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
