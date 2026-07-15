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

export interface ProductVariant {
  id: string;
  sku: string;
  weight: string;
  packSize: string;
  flavour: string;
  price: number;
  originalPrice: number;
  stock: number;
  label: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  rating: number;
  discount: string;
  stock?: number;
  sku?: string;
  shortDescription?: string;
  description?: string[];
  descriptionBullets?: string[];
  tags?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  additionalInfo?: { label: string; value: string }[];
  inStock?: boolean;
}

export interface ProductDetail extends ShopProduct {
  reviewCount: number;
  sku: string;
  tags: string[];
  sizes: string[];
  variants: ProductVariant[];
  images: string[];
  inStock: boolean;
  shortDescription: string;
  description: string[];
  descriptionBullets: string[];
  additionalInfo: { label: string; value: string }[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  variantLabel?: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}
