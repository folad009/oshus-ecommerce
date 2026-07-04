"use client";

import { useMemo, useState } from "react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SpecialOfferSection } from "@/components/SpecialOfferSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesSection } from "@/components/CategoriesSection";
import type { Category, Product, ShopProduct } from "@/types";

interface LandingProductsClientProps {
  products: Product[];
  featuredProducts: ShopProduct[];
  categoryTabs: string[];
  sidebarCategories: Category[];
}

export function LandingProductsClient({
  products,
  featuredProducts,
  categoryTabs,
  sidebarCategories,
}: LandingProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return products.slice(0, 8);
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <CategoryTabs
        categories={categoryTabs}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SpecialOfferSection products={products} />
      <FeaturedProducts products={featuredProducts} />
      <CategoriesSection
        products={filteredProducts}
        categories={sidebarCategories ?? []}
      />
    </>
  );
}
