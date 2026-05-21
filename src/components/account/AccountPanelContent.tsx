"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordManagerForm } from "@/components/account/PasswordManagerForm";
import type { AccountMenuId } from "@/data/account";

interface AccountPanelContentProps {
  activeId: AccountMenuId;
}

export function AccountPanelContent({ activeId }: AccountPanelContentProps) {
  if (activeId === "password") {
    return <PasswordManagerForm />;
  }

  if (activeId === "personal") {
    return (
      <form className="flex flex-col gap-5 max-w-lg">
        <div>
          <label htmlFor="full-name" className="text-sm font-medium text-foreground mb-1.5 block">
            Full Name <span className="text-coral">*</span>
          </label>
          <Input id="full-name" defaultValue="John Doe" className="h-11 rounded-lg" />
        </div>
        <div>
          <label htmlFor="account-email" className="text-sm font-medium text-foreground mb-1.5 block">
            Email <span className="text-coral">*</span>
          </label>
          <Input
            id="account-email"
            type="email"
            defaultValue="john@example.com"
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1.5 block">
            Phone
          </label>
          <Input id="phone" defaultValue="+234 800 123 4567" className="h-11 rounded-lg" />
        </div>
        <Button className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold w-fit">
          Save Changes
        </Button>
      </form>
    );
  }

  if (activeId === "orders") {
    return (
      <div className="max-w-lg">
        <p className="text-sm text-muted-foreground mb-4">
          View and track your recent orders.
        </p>
        <Link
          href="/track-order"
          className="text-sm font-medium text-forest underline hover:text-forest-dark"
        >
          Track Your Order →
        </Link>
      </div>
    );
  }

  if (activeId === "address") {
    return (
      <form className="flex flex-col gap-5 max-w-lg">
        <div>
          <label htmlFor="street" className="text-sm font-medium text-foreground mb-1.5 block">
            Street Address
          </label>
          <Input
            id="street"
            defaultValue="12 Admiralty Way, Lekki Phase 1"
            className="h-11 rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="text-sm font-medium text-foreground mb-1.5 block">
              City
            </label>
            <Input id="city" defaultValue="Lagos" className="h-11 rounded-lg" />
          </div>
          <div>
            <label htmlFor="country" className="text-sm font-medium text-foreground mb-1.5 block">
              Country
            </label>
            <Input id="country" defaultValue="Nigeria" className="h-11 rounded-lg" />
          </div>
        </div>
        <Button className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold w-fit">
          Save Address
        </Button>
      </form>
    );
  }

  if (activeId === "payment") {
    return (
      <div className="max-w-lg">
        <p className="text-sm text-muted-foreground mb-4">
          Your default payment method is Paystack. All payments are processed securely.
        </p>
        <div className="rounded-xl border border-border bg-light-gray px-5 py-4 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-forest flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">PS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Paystack</p>
            <p className="text-xs text-muted-foreground">Card, bank transfer, USSD</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
