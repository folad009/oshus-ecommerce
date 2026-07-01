"use client";

import { MapPin } from "lucide-react";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/store/currency-provider";

export function AnnouncementBar() {
  const { formatFromNgn } = useCurrency();

  return (
    <div className="bg-navy text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            Deliver to Lagos, Nigeria
          </span>
          <span className="hidden md:inline">
            Free shipping on orders over {formatFromNgn(50_000)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Track Order</span>
          <span>Help</span>
          <CurrencySelector />
        </div>
      </div>
    </div>
  );
}
