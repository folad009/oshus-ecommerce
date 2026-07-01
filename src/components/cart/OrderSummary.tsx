"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/store/currency-provider";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
  checkoutDisabled?: boolean;
}

export function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  taxes,
  couponDiscount,
  total,
  checkoutDisabled = false,
}: OrderSummaryProps) {
  const { formatFromNgn } = useCurrency();

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sticky top-24">
      <h2 className="text-base font-bold text-foreground mb-5">Order Summary</h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium text-foreground">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Sub Total</span>
          <span className="font-medium text-foreground">
            {formatFromNgn(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-muted-foreground text-right">
            Calculated at checkout
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span className="font-medium text-foreground">
            {formatFromNgn(taxes)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Coupon Discount</span>
          <span className="font-medium text-forest">
            -{formatFromNgn(couponDiscount)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mb-6">
        <span className="text-base font-bold text-foreground">Total:</span>
        <span className="text-base font-bold text-foreground">
          {formatFromNgn(total)}
        </span>
      </div>

      {checkoutDisabled ? (
        <span
          className={cn(
            buttonVariants(),
            "w-full bg-muted text-muted-foreground rounded-xl h-12 text-sm font-semibold pointer-events-none"
          )}
        >
          Proceed to Checkout
        </span>
      ) : (
        <Link
          href="/checkout"
          className={cn(
            buttonVariants(),
            "w-full bg-forest hover:bg-forest-dark text-white rounded-xl h-12 text-sm font-semibold"
          )}
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
