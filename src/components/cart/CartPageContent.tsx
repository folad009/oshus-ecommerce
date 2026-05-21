"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { cartItems as initialItems, cartSummary } from "@/data/cart";
import { formatNaira } from "@/lib/currency";
import type { CartItem } from "@/types";

export function CartPageContent() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const lineSubtotal = (item: CartItem) => item.price * item.quantity;
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + lineSubtotal(item),
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total =
    calculatedSubtotal -
    cartSummary.couponDiscount +
    cartSummary.shipping +
    cartSummary.taxes;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 min-w-0">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-cart-yellow">
                    <th className="text-left text-sm font-semibold text-foreground py-3.5 px-4 w-10" />
                    <th className="text-left text-sm font-semibold text-foreground py-3.5 px-4">
                      Product
                    </th>
                    <th className="text-left text-sm font-semibold text-foreground py-3.5 px-4">
                      Price
                    </th>
                    <th className="text-center text-sm font-semibold text-foreground py-3.5 px-4">
                      Quantity
                    </th>
                    <th className="text-right text-sm font-semibold text-foreground py-3.5 px-4">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-sm text-muted-foreground"
                      >
                        Your cart is empty.
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-border bg-white"
                      >
                        <td className="py-4 px-4 align-middle">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="size-4" />
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-light-gray">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground align-middle">
                          {formatNaira(item.price)}
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="size-8 rounded-lg border border-border flex items-center justify-center hover:bg-light-gray transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="size-8 rounded-lg border border-border flex items-center justify-center hover:bg-light-gray transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold text-foreground text-right align-middle">
                          {formatNaira(lineSubtotal(item))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="rounded-xl h-11 bg-white border-border"
                />
                <Button className="bg-forest hover:bg-forest-dark text-white rounded-xl h-11 px-5 text-sm font-semibold shrink-0">
                  Apply Coupon
                </Button>
              </div>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm text-forest font-medium underline hover:text-forest-dark transition-colors shrink-0"
                >
                  Clear Shopping Cart
                </button>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[320px] shrink-0">
            <OrderSummary
              itemCount={itemCount || cartSummary.itemCount}
              subtotal={
                items.length > 0 ? calculatedSubtotal : cartSummary.subtotal
              }
              shipping={cartSummary.shipping}
              taxes={cartSummary.taxes}
              couponDiscount={cartSummary.couponDiscount}
              total={items.length > 0 ? total : cartSummary.total}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
