import { shopProducts } from "@/data/shop";
import type { ShopProduct } from "@/types";

export type VendorOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface VendorStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface VendorProduct extends ShopProduct {
  stock: number;
  sales: number;
}

export interface VendorOrder {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: VendorOrderStatus;
  commission: number;
}

export interface VendorPayout {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending";
  reference: string;
}

export const vendorProfile = {
  name: "Chioma Adeleke",
  email: "chioma@glowbeauty.ng",
  storeName: "Glow Beauty Co.",
  storeSlug: "glow-beauty",
  role: "Vendor",
};

export const vendorStats: VendorStat[] = [
  {
    label: "Total Earnings",
    value: "₦1,842,500",
    change: "+14.2%",
    trend: "up",
  },
  {
    label: "Orders",
    value: "186",
    change: "+9 this week",
    trend: "up",
  },
  {
    label: "Products",
    value: "8",
    change: "2 low stock",
    trend: "neutral",
  },
  {
    label: "Store Rating",
    value: "4.8",
    change: "+32 reviews",
    trend: "up",
  },
];

const vendorProductIds = [
  "shop-1",
  "shop-2",
  "shop-3",
  "shop-5",
  "shop-6",
  "shop-7",
  "shop-8",
  "shop-11",
];

export const vendorProducts: VendorProduct[] = shopProducts
  .filter((p) => vendorProductIds.includes(p.id))
  .map((p, i) => ({
    ...p,
    stock: [42, 18, 56, 24, 31, 12, 8, 67][i] ?? 20,
    sales: [128, 94, 76, 45, 112, 88, 52, 39][i] ?? 50,
  }));

export const vendorOrders: VendorOrder[] = [
  {
    id: "#SDGT1254FD",
    customer: "Ada Okonkwo",
    date: "20 Apr 2024",
    items: 3,
    total: 270_000,
    status: "processing",
    commission: 27_000,
  },
  {
    id: "#SDGT1253AB",
    customer: "John Doe",
    date: "19 Apr 2024",
    items: 2,
    total: 150_000,
    status: "shipped",
    commission: 15_000,
  },
  {
    id: "#SDGT1252XY",
    customer: "Sarah Kim",
    date: "18 Apr 2024",
    items: 1,
    total: 48_000,
    status: "delivered",
    commission: 4_800,
  },
  {
    id: "#SDGT1251PQ",
    customer: "Michael Chen",
    date: "18 Apr 2024",
    items: 2,
    total: 185_000,
    status: "pending",
    commission: 18_500,
  },
  {
    id: "#SDGT1250LM",
    customer: "Grace Adeyemi",
    date: "17 Apr 2024",
    items: 4,
    total: 320_000,
    status: "delivered",
    commission: 32_000,
  },
];

export const vendorPayouts: VendorPayout[] = [
  {
    id: "PAY-2404-01",
    date: "15 Apr 2024",
    amount: 485_000,
    status: "completed",
    reference: "Paystack Transfer",
  },
  {
    id: "PAY-2403-02",
    date: "28 Mar 2024",
    amount: 612_000,
    status: "completed",
    reference: "Paystack Transfer",
  },
  {
    id: "PAY-2403-01",
    date: "14 Mar 2024",
    amount: 398_500,
    status: "completed",
    reference: "Paystack Transfer",
  },
  {
    id: "PAY-2404-02",
    date: "22 Apr 2024",
    amount: 347_000,
    status: "pending",
    reference: "Scheduled payout",
  },
];

export const vendorNavItems = [
  { label: "Dashboard", href: "/vendor", icon: "layout-dashboard" as const },
  { label: "Products", href: "/vendor/products", icon: "package" as const },
  { label: "Orders", href: "/vendor/orders", icon: "shopping-bag" as const },
  {
    label: "Track Order",
    href: "/vendor/track-order",
    icon: "truck" as const,
  },
  { label: "Earnings", href: "/vendor/earnings", icon: "wallet" as const },
  { label: "Settings", href: "/vendor/settings", icon: "settings" as const },
] as const;

export const vendorOrderStatusStyles: Record<
  VendorOrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-800",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-100 text-purple-800",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800",
  },
};
