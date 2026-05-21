"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Settings"
      subtitle="Configure your store preferences"
    >
      <div className="max-w-xl bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col gap-5">
        <div>
          <label
            htmlFor="store-name"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Store Name
          </label>
          <Input
            id="store-name"
            defaultValue="Oshus Store"
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="store-email"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Support Email
          </label>
          <Input
            id="store-email"
            type="email"
            defaultValue="hello@oshusstore.com"
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="currency"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Currency
          </label>
          <Input id="currency" defaultValue="NGN" className="h-11 rounded-lg" />
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="size-4 rounded accent-forest"
            />
            <span className="text-sm text-foreground">
              Enable Paystack payments
            </span>
          </label>
        </div>
        <Button className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-6 text-sm font-semibold w-fit">
          Save Settings
        </Button>
      </div>
    </AdminShell>
  );
}
