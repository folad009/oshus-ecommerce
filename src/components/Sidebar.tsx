"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { categories } from "@/data/categories";

function SliderComponent({
  value,
  onChange,
}: {
  value: number[];
  onChange: (val: number[]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Min: ₦{value[0]}</span>
        <span>Max: ₦{value[1]}</span>
      </div>
      <div className="h-2 bg-mid-gray rounded-full relative">
        <div
          className="absolute h-full bg-coral rounded-full"
          style={{
            left: `${(value[0] / 500) * 100}%`,
            right: `${100 - (value[1] / 500) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export function Sidebar() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      {/* Categories Filter */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="size-4 text-navy" />
          <h3 className="text-sm font-bold text-navy">Browse Categories</h3>
        </div>

        <div className="flex flex-col gap-2">
          {displayedCategories.map((cat) => (
            <button
              key={cat.id}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-light-gray transition-colors text-left"
            >
              <span className="text-sm text-navy">{cat.name}</span>
              <span className="text-xs text-muted-foreground bg-light-gray px-2 py-0.5 rounded-full">
                {cat.productCount}
              </span>
            </button>
          ))}
        </div>

        {categories.length > 4 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="flex items-center gap-1 text-coral text-xs font-medium mt-2 ml-3"
          >
            {showAllCategories ? "Show Less" : "Show More"}
            {showAllCategories ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        )}

        <Separator className="my-4" />

        {/* Price Range */}
        <h4 className="text-sm font-bold text-navy mb-3">Price Range</h4>
        <SliderComponent value={priceRange} onChange={setPriceRange} />

        <div className="flex gap-2 mt-3">
          <Input
            type="number"
            placeholder="Min"
            className="h-8 text-xs rounded-lg bg-light-gray border-0"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <Input
            type="number"
            placeholder="Max"
            className="h-8 text-xs rounded-lg bg-light-gray border-0"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Quick Payment Widget */}
      <div className="bg-navy rounded-2xl p-5 text-white">
        <h3 className="text-sm font-bold mb-1">Payment Made Easy</h3>
        <p className="text-white/60 text-xs mb-4">
          Secure and fast checkout with multiple payment options
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">Subtotal</span>
            <span className="font-medium">₦230,425</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">Delivery</span>
            <span className="font-medium">₦2,500</span>
          </div>
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Total</span>
            <span className="font-bold">₦232,925</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-white/70">Qty:</span>
          <div className="flex items-center gap-1">
            <button className="size-6 rounded bg-white/10 text-white text-xs flex items-center justify-center hover:bg-white/20">
              -
            </button>
            <span className="text-xs font-medium w-6 text-center">3</span>
            <button className="size-6 rounded bg-white/10 text-white text-xs flex items-center justify-center hover:bg-white/20">
              +
            </button>
          </div>
        </div>

        <Button className="w-full bg-coral hover:bg-coral-dark text-white rounded-lg h-10 text-sm font-semibold">
          Checkout Now
        </Button>
      </div>
    </div>
  );
}
