"use client";

import { ChevronDown } from "lucide-react";
import { CURRENCY_OPTIONS, type StoreCurrency } from "@/lib/currency";
import { useCurrency } from "@/store/currency-provider";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
  className?: string;
}

export function CurrencySelector({ className }: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Choose currency</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value as StoreCurrency)}
        className="appearance-none bg-transparent text-white text-xs pr-5 cursor-pointer focus:outline-none"
        aria-label="Currency"
      >
        {CURRENCY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code} className="text-foreground">
            {option.symbol} {option.code}
          </option>
        ))}
      </select>
      <ChevronDown className="size-3 absolute right-0 pointer-events-none" />
    </label>
  );
}
