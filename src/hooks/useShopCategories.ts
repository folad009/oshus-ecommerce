"use client";

import { useCallback, useEffect, useState } from "react";
import { shopCategories as fallbackCategories } from "@/data/shop";
import type { ShopCategory } from "@/data/shop-categories";

export function useShopCategories() {
  const [categories, setCategories] = useState<ShopCategory[]>(
    fallbackCategories.map((name, index) => ({
      id: `fallback-${index}`,
      name,
    }))
  );
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = (await res.json()) as { categories?: ShopCategory[] };

      if (res.ok && data.categories?.length) {
        setCategories(data.categories);
      }
    } catch {
      // Keep fallback categories on failure
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return { categories, loading, reload: loadCategories };
}
