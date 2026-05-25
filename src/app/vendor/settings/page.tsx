"use client";

import { VendorShell } from "@/components/vendor/VendorShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vendorProfile } from "@/data/vendor";

export default function VendorSettingsPage() {
  return (
    <VendorShell
      title="Settings"
      subtitle="Manage your vendor store profile"
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
            defaultValue={vendorProfile.storeName}
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="store-slug"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Store URL Slug
          </label>
          <Input
            id="store-slug"
            defaultValue={vendorProfile.storeSlug}
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="vendor-email"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Contact Email
          </label>
          <Input
            id="vendor-email"
            type="email"
            defaultValue={vendorProfile.email}
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor="vendor-name"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Vendor Name
          </label>
          <Input
            id="vendor-name"
            defaultValue={vendorProfile.name}
            className="h-11 rounded-lg"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="size-4 rounded accent-navy-light"
            />
            <span className="text-sm text-foreground">
              Accept Paystack payouts to registered account
            </span>
          </label>
        </div>
        <Button className="bg-navy-light hover:bg-navy text-white rounded-lg h-11 px-6 text-sm font-semibold w-fit">
          Save Settings
        </Button>
      </div>
    </VendorShell>
  );
}
