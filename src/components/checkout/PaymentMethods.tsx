"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { savePendingCheckout } from "@/lib/pending-checkout-storage";
import { useCart } from "@/store/cart-provider";

const DELIVERY_CITIES = ["Lagos", "Abuja", "Ibadan"] as const;

type PaymentProvider = "paystack" | "opay";

interface PaymentMethodsProps {
  shippingFee: number;
  onShippingFeeChange: (fee: number) => void;
}

export function PaymentMethods({
  shippingFee,
  onShippingFeeChange,
}: PaymentMethodsProps) {
  const { items, subtotal, taxes, couponDiscount } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] =
    useState<(typeof DELIVERY_CITIES)[number]>("Lagos");
  const [provider, setProvider] = useState<PaymentProvider>("paystack");
  const [loading, setLoading] = useState(false);
  const [quoting, setQuoting] = useState(false);
  const [error, setError] = useState("");

  const total = subtotal + shippingFee + taxes - couponDiscount;

  async function fetchShippingQuote() {
    if (!name || !phone || !address || !email) {
      return;
    }

    setQuoting(true);
    setError("");

    try {
      const res = await fetch("/api/shipping/kwik/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          deliveryAddress: address,
          deliveryCity: city,
        }),
      });

      const data = (await res.json()) as { error?: string; fee?: number };

      if (!res.ok) {
        setError(data.error ?? "Could not get delivery quote.");
        return;
      }

      onShippingFeeChange(data.fee ?? 0);
    } catch {
      setError("Could not reach delivery service.");
    } finally {
      setQuoting(false);
    }
  }

  async function handlePay() {
    if (!email || !name || !phone || !address) {
      setError("Complete all delivery and contact fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (shippingFee <= 0) {
      setError("Get a delivery quote before paying.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: `${address}, ${city}`,
          deliveryCity: city,
          paymentMethod: provider,
          shippingFee,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            image: item.image,
            productId: item.id,
          })),
        }),
      });

      const orderData = (await orderRes.json()) as {
        error?: string;
        orderNumber?: string;
        total?: number;
      };

      if (!orderRes.ok || !orderData.orderNumber) {
        setError(orderData.error ?? "Could not create order.");
        return;
      }

      savePendingCheckout({
        orderNumber: orderData.orderNumber,
        customerName: name,
        customerEmail: email,
        items: [...items],
        subtotal,
        shipping: shippingFee,
        taxes,
        couponDiscount,
        total: orderData.total ?? total,
      });

      const payRes = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: orderData.orderNumber,
          provider,
        }),
      });

      const payData = (await payRes.json()) as {
        error?: string;
        authorizationUrl?: string;
      };

      if (!payRes.ok || !payData.authorizationUrl) {
        setError(payData.error ?? "Could not start payment.");
        return;
      }

      window.location.assign(payData.authorizationUrl);
    } catch {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-base font-bold text-foreground mb-5">
          Delivery Details (Kwik)
        </h2>
        <div className="rounded-xl border border-border bg-white p-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="checkout-city"
              className="text-xs font-medium text-foreground mb-1.5 block"
            >
              Delivery City
            </label>
            <select
              id="checkout-city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value as (typeof DELIVERY_CITIES)[number]);
                onShippingFeeChange(0);
              }}
              className="w-full h-11 rounded-lg border border-border px-3 text-sm bg-white"
            >
              {DELIVERY_CITIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="checkout-address"
              className="text-xs font-medium text-foreground mb-1.5 block"
            >
              Delivery Address
            </label>
            <Input
              id="checkout-address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                onShippingFeeChange(0);
              }}
              placeholder="12 Admiralty Way, Lekki Phase 1"
              className="h-11 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-name"
                className="text-xs font-medium text-foreground mb-1.5 block"
              >
                Full Name
              </label>
              <Input
                id="checkout-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Okonkwo"
                className="h-11 rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="checkout-phone"
                className="text-xs font-medium text-foreground mb-1.5 block"
              >
                Phone Number
              </label>
              <Input
                id="checkout-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2348012345678"
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="checkout-email"
              className="text-xs font-medium text-foreground mb-1.5 block"
            >
              Email Address
            </label>
            <Input
              id="checkout-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-11 rounded-lg"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => void fetchShippingQuote()}
            disabled={quoting || !name || !phone || !address || !email}
            className="w-full sm:w-auto h-11 rounded-lg"
          >
            {quoting ? "Getting quote..." : "Get Kwik Delivery Quote"}
          </Button>

          {shippingFee > 0 && (
            <p className="text-sm text-forest">
              Kwik delivery: {formatNaira(shippingFee)}
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold text-foreground mb-5">
          Payment Method
        </h2>

        <div className="flex flex-col gap-3 mb-5">
          {(
            [
              {
                id: "paystack" as const,
                label: "Paystack",
                description: "Card, bank transfer, USSD",
                badge: "PS",
                color: "bg-checkout-green",
              },
              {
                id: "opay" as const,
                label: "OPay",
                description: "OPay wallet, card, bank transfer",
                badge: "OP",
                color: "bg-forest",
              },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setProvider(option.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors flex items-center gap-3",
                provider === option.id
                  ? "border-forest bg-forest/5"
                  : "border-border bg-white hover:border-forest/40"
              )}
            >
              <div
                className={cn(
                  "size-10 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold",
                  option.color
                )}
              >
                {option.badge}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <p className="text-sm text-coral mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <ShieldCheck className="size-4 text-checkout-green shrink-0" />
          <span>
            You will be redirected to {provider === "paystack" ? "Paystack" : "OPay"} to pay securely.
          </span>
        </div>

        <Button
          type="button"
          onClick={() => void handlePay()}
          disabled={
            loading ||
            !email ||
            !name ||
            !phone ||
            !address ||
            items.length === 0 ||
            shippingFee <= 0
          }
          className="w-full bg-checkout-green hover:bg-checkout-green-dark text-white rounded-lg h-12 text-sm font-semibold"
        >
          {loading
            ? "Processing…"
            : `Pay ${formatNaira(total)} with ${provider === "paystack" ? "Paystack" : "OPay"}`}
        </Button>
      </div>
    </div>
  );
}
