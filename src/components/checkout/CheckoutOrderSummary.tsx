"use client";

import { Separator } from "@/components/ui/separator";
import { formatNaira } from "@/lib/currency";
import { useCart } from "@/store/cart-provider";

interface CheckoutOrderSummaryProps {
  shippingFee: number;
}

export function CheckoutOrderSummary({ shippingFee }: CheckoutOrderSummaryProps) {
  const { items, itemCount, subtotal, taxes, couponDiscount } = useCart();
  const total = subtotal + shippingFee + taxes - couponDiscount;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-24">
      <h2 className="text-base font-bold text-foreground mb-5">Order Summary</h2>

      {items.length > 0 && (
        <ul className="flex flex-col gap-3 mb-5 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-3">
              <span className="text-foreground">
                {item.name}{" "}
                <span className="text-muted-foreground">× {item.quantity}</span>
              </span>
              <span className="font-medium shrink-0">
                {formatNaira(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium text-foreground">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Sub Total</span>
          <span className="font-medium text-foreground">
            {formatNaira(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Kwik Delivery</span>
          <span className="font-medium text-foreground">
            {shippingFee > 0 ? formatNaira(shippingFee) : "Get quote"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span className="font-medium text-foreground">
            {formatNaira(taxes)}
          </span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Coupon Discount</span>
            <span className="font-medium text-checkout-green">
              -{formatNaira(couponDiscount)}
            </span>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Total:</span>
        <span className="text-base font-bold text-foreground">
          {formatNaira(total)}
        </span>
      </div>
    </div>
  );
}
