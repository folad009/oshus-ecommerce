export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
}

export interface AdminStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export const adminStats: AdminStat[] = [
  {
    label: "Total Revenue",
    value: "₦4,285,400",
    change: "+12.5%",
    trend: "up",
  },
  {
    label: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    trend: "up",
  },
  {
    label: "Products",
    value: "12",
    change: "+2 new",
    trend: "neutral",
  },
  {
    label: "Customers",
    value: "3,842",
    change: "+18.1%",
    trend: "up",
  },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "#SDGT1254FD",
    customer: "Ada Okonkwo",
    email: "ada@example.com",
    date: "20 Apr 2024",
    items: 4,
    total: 270_000,
    status: "processing",
    paymentMethod: "Paystack",
  },
  {
    id: "#SDGT1253AB",
    customer: "John Doe",
    email: "john@example.com",
    date: "19 Apr 2024",
    items: 2,
    total: 150_000,
    status: "shipped",
    paymentMethod: "Paystack",
  },
  {
    id: "#SDGT1252XY",
    customer: "Sarah Kim",
    email: "sarah@example.com",
    date: "18 Apr 2024",
    items: 1,
    total: 48_000,
    status: "delivered",
    paymentMethod: "Paystack",
  },
  {
    id: "#SDGT1251PQ",
    customer: "Michael Chen",
    email: "michael@example.com",
    date: "18 Apr 2024",
    items: 3,
    total: 185_000,
    status: "pending",
    paymentMethod: "Paystack",
  },
  {
    id: "#SDGT1250LM",
    customer: "Grace Adeyemi",
    email: "grace@example.com",
    date: "17 Apr 2024",
    items: 5,
    total: 320_000,
    status: "delivered",
    paymentMethod: "Paystack",
  },
  {
    id: "#SDGT1249RS",
    customer: "David Wilson",
    email: "david@example.com",
    date: "17 Apr 2024",
    items: 2,
    total: 95_000,
    status: "cancelled",
    paymentMethod: "Paystack",
  },
];

export const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: "layout-dashboard" as const },
  { label: "Products", href: "/admin/products", icon: "package" as const },
  { label: "Orders", href: "/admin/orders", icon: "shopping-bag" as const },
  {
    label: "Track Order",
    href: "/admin/track-order",
    icon: "truck" as const,
  },
  { label: "Customers", href: "/admin/customers", icon: "users" as const },
  { label: "Settings", href: "/admin/settings", icon: "settings" as const },
] as const;

export const statusStyles: Record<
  OrderStatus,
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
