import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { checkoutSummary, formatNaira } from "@/data/checkout";

export function CheckoutOrderSummary() {
  const { itemCount, subtotal, shipping, taxes, couponDiscount, total } =
    checkoutSummary;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-24">
      <h2 className="text-base font-bold text-foreground mb-5">Order Summary</h2>

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
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {formatNaira(shipping)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span className="font-medium text-foreground">
            {formatNaira(taxes)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Coupon Discount</span>
          <span className="font-medium text-checkout-green">
            -{formatNaira(couponDiscount)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mb-6">
        <span className="text-base font-bold text-foreground">Total:</span>
        <span className="text-base font-bold text-foreground">
          {formatNaira(total)}
        </span>
      </div>

      <Link
        href="/order-completed"
        className={cn(
          buttonVariants(),
          "w-full bg-checkout-green hover:bg-checkout-green-dark text-white rounded-lg h-12 text-sm font-semibold"
        )}
      >
        Pay with Paystack
      </Link>
    </div>
  );
}
