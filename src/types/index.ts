export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  badge?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeaturedBanner {
  id: string;
  title: string;
  subtitle: string;
  price?: number;
  image: string;
  bgColor: string;
  textColor: string;
  cta?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  discount: string;
}

export interface ProductDetail extends ShopProduct {
  reviewCount: number;
  sku: string;
  tags: string[];
  sizes: string[];
  images: string[];
  inStock: boolean;
  shortDescription: string;
  description: string[];
  descriptionBullets: string[];
  additionalInfo: { label: string; value: string }[];
}

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}
