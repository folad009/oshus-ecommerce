"use client";

import { useCurrency } from "@/store/currency-provider";

interface PriceProps {
  amountNgn: number;
  className?: string;
}

export function Price({ amountNgn, className }: PriceProps) {
  const { formatFromNgn } = useCurrency();

  return (
    <span className={className} suppressHydrationWarning>
      {formatFromNgn(amountNgn)}
    </span>
  );
}
