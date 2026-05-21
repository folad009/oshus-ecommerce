import type { ShopProduct } from "@/types";

export const shopCategories = [
  "Skin Care",
  "Makeup",
  "Hair Care",
  "Fragrances",
  "Nail Care",
  "Body Care",
] as const;

export const shopSkinTypes = [
  "Normal",
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
] as const;

export const shopPromotions = [
  { id: "new-arrivals", label: "New Arrivals", defaultChecked: false },
  { id: "best-sellers", label: "Best Sellers", defaultChecked: true },
  { id: "on-sale", label: "On Sale", defaultChecked: false },
] as const;

export const shopAvailability = [
  { id: "in-stock", label: "In Stock", defaultChecked: true },
  { id: "out-of-stock", label: "Out of Stocks", defaultChecked: false },
] as const;

export const shopReviewLevels = [5, 4, 3, 2, 1] as const;

export const shopSortOptions = [
  "Default Sorting",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Best Rating",
] as const;

export const shopProducts: ShopProduct[] = [
  {
    id: "shop-1",
    name: "SilkSculpt Serum",
    category: "Skin Care",
    price: 35000,
    originalPrice: 70000,
    image:
      "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=400&h=500&fit=crop",
    rating: 4.9,
    discount: "50% off",
  },
  {
    id: "shop-2",
    name: "VelvetGlow Foundation",
    category: "Makeup",
    price: 42000,
    originalPrice: 56000,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    rating: 4.8,
    discount: "25% off",
  },
  {
    id: "shop-3",
    name: "PureRoots Shampoo",
    category: "Hair Care",
    price: 28000,
    originalPrice: 40000,
    image:
      "https://images.unsplash.com/photo-1535585209827-a68fc5b0e5b1?w=400&h=500&fit=crop",
    rating: 4.7,
    discount: "30% off",
  },
  {
    id: "shop-4",
    name: "AuraMist Perfume",
    category: "Fragrances",
    price: 65000,
    originalPrice: 85000,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
    rating: 4.9,
    discount: "20% off",
  },
  {
    id: "shop-5",
    name: "LunaLacquer Polish",
    category: "Nail Care",
    price: 18000,
    originalPrice: 24000,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop",
    rating: 4.6,
    discount: "25% off",
  },
  {
    id: "shop-6",
    name: "SilkTouch Body Lotion",
    category: "Body Care",
    price: 32000,
    originalPrice: 45000,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    rating: 4.8,
    discount: "30% off",
  },
  {
    id: "shop-7",
    name: "HydraBloom Moisturizer",
    category: "Skin Care",
    price: 48000,
    originalPrice: 60000,
    image:
      "https://images.unsplash.com/photo-1570194065595-8c2a7a0e2b0d?w=400&h=500&fit=crop",
    rating: 4.9,
    discount: "20% off",
  },
  {
    id: "shop-8",
    name: "RosePetal Lip Tint",
    category: "Makeup",
    price: 22000,
    originalPrice: 30000,
    image:
      "https://images.unsplash.com/photo-1586495777744-441de168c6a8?w=400&h=500&fit=crop",
    rating: 4.7,
    discount: "25% off",
  },
  {
    id: "shop-9",
    name: "CurlDefine Cream",
    category: "Hair Care",
    price: 36000,
    originalPrice: 48000,
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9e4e0c2?w=400&h=500&fit=crop",
    rating: 4.6,
    discount: "25% off",
  },
  {
    id: "shop-10",
    name: "OceanBreeze Cologne",
    category: "Fragrances",
    price: 55000,
    originalPrice: 72000,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop",
    rating: 4.8,
    discount: "25% off",
  },
  {
    id: "shop-11",
    name: "GelShine Top Coat",
    category: "Nail Care",
    price: 15000,
    originalPrice: 20000,
    image:
      "https://images.unsplash.com/photo-1610994573240-5d2f1f8f0b0e?w=400&h=500&fit=crop",
    rating: 4.5,
    discount: "25% off",
  },
  {
    id: "shop-12",
    name: "CocoaButter Balm",
    category: "Body Care",
    price: 26000,
    originalPrice: 35000,
    image:
      "https://images.unsplash.com/photo-1608248543809-ba3d6a1d4b4a?w=400&h=500&fit=crop",
    rating: 4.7,
    discount: "25% off",
  },
];

export const shopFeatures = [
  {
    title: "Free Shipping",
    description: "Free shipping for order above ₦50,000",
    icon: "truck" as const,
  },
  {
    title: "Flexible Payment",
    description: "Multiple secure payment options",
    icon: "credit-card" as const,
  },
  {
    title: "24x7 Support",
    description: "We support online all days",
    icon: "headphones" as const,
  },
];
