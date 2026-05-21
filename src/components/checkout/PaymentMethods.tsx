"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { checkoutSummary, formatNaira } from "@/data/checkout";

export function PaymentMethods() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h2 className="text-base font-bold text-foreground mb-5">
        Pay with Paystack
      </h2>

      <div className="rounded-xl border border-checkout-green bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-lg bg-checkout-green flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">PS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Paystack</p>
            <p className="text-xs text-muted-foreground">
              Card, bank transfer, USSD and more
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          You will be redirected to Paystack to complete your payment securely.
          We never store your card details.
        </p>

        <div className="mb-5">
          <label
            htmlFor="paystack-email"
            className="text-xs font-medium text-foreground mb-1.5 block"
          >
            Email Address
          </label>
          <Input
            id="paystack-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg"
            required
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <ShieldCheck className="size-4 text-checkout-green shrink-0" />
          <span>Secured by Paystack. PCI-DSS compliant payments.</span>
        </div>

        <Link
          href={email ? "/order-completed" : "#"}
          aria-disabled={!email}
          className={cn(
            buttonVariants(),
            "w-full bg-checkout-green hover:bg-checkout-green-dark text-white rounded-lg h-12 text-sm font-semibold",
            !email && "pointer-events-none opacity-50"
          )}
        >
          Pay {formatNaira(checkoutSummary.total)} with Paystack
        </Link>
      </div>
    </div>
  );
}
