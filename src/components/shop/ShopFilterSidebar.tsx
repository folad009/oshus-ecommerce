"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useShopCategories } from "@/hooks/useShopCategories";
import {
  shopSkinTypes,
  shopPromotions,
  shopAvailability,
  shopReviewLevels,
} from "@/data/shop";
import { formatNaira } from "@/lib/currency";

const PRICE_MAX = 100_000;

interface ShopFilterSidebarProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

function FilterCheckbox({
  id,
  label,
  defaultChecked = false,
}: {
  id: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2.5 cursor-pointer group"
    >
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="size-4 rounded border-border text-forest focus:ring-forest accent-forest"
      />
      <span className="text-sm text-foreground/80 group-hover:text-forest transition-colors">
        {label}
      </span>
    </label>
  );
}

function PriceSlider({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatNaira(value[0])}</span>
        <span>{formatNaira(value[1])}</span>
      </div>
      <div className="relative h-1.5 bg-mid-gray rounded-full">
        <div
          className="absolute h-full bg-forest rounded-full"
          style={{
            left: `${(value[0] / PRICE_MAX) * 100}%`,
            right: `${100 - (value[1] / PRICE_MAX) * 100}%`,
          }}
        />
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={value[0]}
          onChange={(e) =>
            onChange([Math.min(Number(e.target.value), value[1] - 1), value[1]])
          }
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={value[1]}
          onChange={(e) =>
            onChange([value[0], Math.max(Number(e.target.value), value[0] + 1)])
          }
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="Maximum price"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {formatNaira(value[0])} - {formatNaira(value[1])}
      </p>
    </div>
  );
}

export function ShopFilterSidebar({
  priceRange,
  onPriceChange,
}: ShopFilterSidebarProps) {
  const { categories } = useShopCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <h2 className="text-base font-bold text-foreground mb-6">Filter Options</h2>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            By Categories
          </h3>
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.name ? null : category.name
                    )
                  }
                  className={cn(
                    "text-sm transition-colors text-left w-full",
                    activeCategory === category.name
                      ? "text-forest font-medium"
                      : "text-foreground/70 hover:text-forest"
                  )}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            By Skin Type
          </h3>
          <div className="flex flex-col gap-2.5">
            {shopSkinTypes.map((type) => (
              <FilterCheckbox
                key={type}
                id={`skin-${type}`}
                label={type}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Price</h3>
          <PriceSlider value={priceRange} onChange={onPriceChange} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Review</h3>
          <div className="flex flex-col gap-2.5">
            {shopReviewLevels.map((level) => (
              <label
                key={level}
                htmlFor={`review-${level}`}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  id={`review-${level}`}
                  className="size-4 rounded border-border accent-forest"
                />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-3.5",
                        i < level
                          ? "fill-gold text-gold"
                          : "fill-mid-gray text-mid-gray"
                      )}
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            By Promotions
          </h3>
          <div className="flex flex-col gap-2.5">
            {shopPromotions.map((promo) => (
              <FilterCheckbox
                key={promo.id}
                id={promo.id}
                label={promo.label}
                defaultChecked={promo.defaultChecked}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Availability
          </h3>
          <div className="flex flex-col gap-2.5">
            {shopAvailability.map((item) => (
              <FilterCheckbox
                key={item.id}
                id={item.id}
                label={item.label}
                defaultChecked={item.defaultChecked}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
