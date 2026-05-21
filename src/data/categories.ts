import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "snacks",
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop",
    productCount: 45,
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop",
    productCount: 32,
  },
  {
    id: "pantry",
    name: "Pantry",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200&h=200&fit=crop",
    productCount: 58,
  },
  {
    id: "wellness",
    name: "Wellness",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
    productCount: 28,
  },
  {
    id: "bakery",
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
    productCount: 22,
  },
  {
    id: "organic",
    name: "Organic",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    productCount: 36,
  },
];

export const categoryTabs = [
  "Snacks",
  "Shakes",
  "Dishes",
  "Desserts",
  "Organic",
  "Products",
] as const;
