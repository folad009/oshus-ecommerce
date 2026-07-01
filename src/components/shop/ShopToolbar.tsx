"use client";

import { X } from "lucide-react";
import { shopSortOptions } from "@/data/shop";
import { useCurrency } from "@/store/currency-provider";

interface ActiveFilter {
  id: string;
  label: string;
}

interface ShopToolbarProps {
  priceRange: [number, number];
  activeFilters: ActiveFilter[];
  onRemoveFilter: (id: string) => void;
  onClearAll: () => void;
}

export function ShopToolbar({
  priceRange,
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: ShopToolbarProps) {
  const { formatFromNgn } = useCurrency();

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">1-12</span> of{" "}
          <span className="text-foreground font-medium">2560</span> results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground shrink-0">Sort by:</span>
          <select
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
            defaultValue={shopSortOptions[0]}
          >
            {shopSortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 bg-forest text-white text-xs font-medium px-3 py-1.5 rounded-full">
          Price : {formatFromNgn(priceRange[0])} - {formatFromNgn(priceRange[1])}
          <button
            type="button"
            onClick={() => onRemoveFilter("price")}
            className="hover:text-gold-light transition-colors"
            aria-label="Remove price filter"
          >
            <X className="size-3" />
          </button>
        </span>
        {activeFilters.map((filter) => (
          <span
            key={filter.id}
            className="inline-flex items-center gap-1.5 bg-forest text-white text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {filter.label}
            <button
              type="button"
              onClick={() => onRemoveFilter(filter.id)}
              className="hover:text-gold-light transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-forest font-medium hover:underline ml-1"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
