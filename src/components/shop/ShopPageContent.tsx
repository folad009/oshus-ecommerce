"use client";

import { useState } from "react";
import { ShopFilterSidebar } from "@/components/shop/ShopFilterSidebar";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { ShopPagination } from "@/components/shop/ShopPagination";
import type { ShopProduct } from "@/types";

const DEFAULT_FILTERS = [
  { id: "best-seller", label: "Best Seller" },
  { id: "in-stock", label: "In Stock" },
];

interface ShopPageContentProps {
  products: ShopProduct[];
}

export function ShopPageContent({ products }: ShopPageContentProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([10_000, 70_000]);
  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);

  const handleRemoveFilter = (id: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setPriceRange([10, 100]);
  };

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <ShopFilterSidebar
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />

          <div className="flex-1 min-w-0">
            <ShopToolbar
              priceRange={priceRange}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAll}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              {products.map((product, index) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  showHoverActions={index === 0}
                />
              ))}
            </div>

            <ShopPagination />
          </div>
        </div>
      </div>
    </section>
  );
}
