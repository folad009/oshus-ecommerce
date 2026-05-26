"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkoutSummary, formatNaira } from "@/data/checkout";
import { cartItems } from "@/data/cart";

export function PaymentMethods() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    if (!email || !name) {
      setError("Enter your name and email to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          items: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            image: item.image,
            productId: item.id.startsWith("cart-") ? undefined : item.id,
          })),
        }),
      });

      const data = (await res.json()) as { error?: string; orderNumber?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not place order. Please try again.");
        return;
      }

      router.push(
        data.orderNumber
          ? `/order-completed?order=${encodeURIComponent(data.orderNumber)}`
          : "/order-completed"
      );
    } catch {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

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

        {error && (
          <p className="text-sm text-coral mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="mb-5">
          <label
            htmlFor="checkout-name"
            className="text-xs font-medium text-foreground mb-1.5 block"
          >
            Full Name
          </label>
          <Input
            id="checkout-name"
            type="text"
            placeholder="Ada Okonkwo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-lg"
            required
          />
        </div>

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

        <Button
          type="button"
          onClick={() => void handlePay()}
          disabled={loading || !email || !name}
          className="w-full bg-checkout-green hover:bg-checkout-green-dark text-white rounded-lg h-12 text-sm font-semibold"
        >
          {loading
            ? "Processing…"
            : `Pay ${formatNaira(checkoutSummary.total)} with Paystack`}
        </Button>
      </div>
    </div>
  );
}
