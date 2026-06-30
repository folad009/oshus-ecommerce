"use client";

import { useMemo, useState } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SpecialOfferSection } from "@/components/SpecialOfferSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesSection } from "@/components/CategoriesSection";
import type { Product, ShopProduct } from "@/types";

interface LandingProductsProps {
  products: Product[];
  featuredProducts: ShopProduct[];
  categories: string[];
}

export function LandingProducts({
  products,
  featuredProducts,
  categories,
}: LandingProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const tabs = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }
    return [...new Set(products.map((product) => product.category))];
  }, [categories, products]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return products.slice(0, 8);
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <CategoryTabs
        categories={tabs}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SpecialOfferSection products={products} />
      <FeaturedProducts products={featuredProducts} />
      <CategoriesSection products={filteredProducts} />
    </>
  );
}
