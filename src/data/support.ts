export type TicketPriority = "high" | "medium" | "low";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  email: string;
  createdAt: string;
  priority: TicketPriority;
  status: TicketStatus;
  orderId?: string;
}

export interface SupportStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface SupportOrderLookup {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: string;
  total: number;
}

export interface SupportCustomer {
  id: string;
  name: string;
  email: string;
  tickets: number;
  lastContact: string;
}

export const supportAgent = {
  name: "Amara Bello",
  email: "amara@oshusstore.com",
  role: "Support Agent",
};

export const supportStats: SupportStat[] = [
  {
    label: "Open Tickets",
    value: "18",
    change: "+3 today",
    trend: "up",
  },
  {
    label: "Resolved Today",
    value: "12",
    change: "+4 vs yesterday",
    trend: "up",
  },
  {
    label: "Avg. Response",
    value: "24 min",
    change: "-6 min",
    trend: "up",
  },
  {
    label: "Active Chats",
    value: "5",
    change: "2 waiting",
    trend: "neutral",
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "TKT-1042",
    subject: "Order not delivered — #SDGT1254FD",
    customer: "Ada Okonkwo",
    email: "ada@example.com",
    createdAt: "20 Apr 2024, 9:15 AM",
    priority: "high",
    status: "open",
    orderId: "#SDGT1254FD",
  },
  {
    id: "TKT-1041",
    subject: "Wrong item received",
    customer: "John Doe",
    email: "john@example.com",
    createdAt: "20 Apr 2024, 8:40 AM",
    priority: "high",
    status: "in_progress",
    orderId: "#SDGT1253AB",
  },
  {
    id: "TKT-1040",
    subject: "Refund request for cancelled order",
    customer: "David Wilson",
    email: "david@example.com",
    createdAt: "19 Apr 2024, 4:20 PM",
    priority: "medium",
    status: "in_progress",
    orderId: "#SDGT1249RS",
  },
  {
    id: "TKT-1039",
    subject: "Paystack payment failed at checkout",
    customer: "Sarah Kim",
    email: "sarah@example.com",
    createdAt: "19 Apr 2024, 2:10 PM",
    priority: "medium",
    status: "open",
  },
  {
    id: "TKT-1038",
    subject: "How to change delivery address?",
    customer: "Michael Chen",
    email: "michael@example.com",
    createdAt: "19 Apr 2024, 11:00 AM",
    priority: "low",
    status: "resolved",
    orderId: "#SDGT1251PQ",
  },
  {
    id: "TKT-1037",
    subject: "Product availability inquiry",
    customer: "Grace Adeyemi",
    email: "grace@example.com",
    createdAt: "18 Apr 2024, 3:45 PM",
    priority: "low",
    status: "closed",
  },
];

export const supportOrders: SupportOrderLookup[] = [
  {
    id: "#SDGT1254FD",
    customer: "Ada Okonkwo",
    email: "ada@example.com",
    date: "20 Apr 2024",
    status: "Processing",
    total: 270_000,
  },
  {
    id: "#SDGT1253AB",
    customer: "John Doe",
    email: "john@example.com",
    date: "19 Apr 2024",
    status: "Shipped",
    total: 150_000,
  },
  {
    id: "#SDGT1252XY",
    customer: "Sarah Kim",
    email: "sarah@example.com",
    date: "18 Apr 2024",
    status: "Delivered",
    total: 48_000,
  },
  {
    id: "#SDGT1251PQ",
    customer: "Michael Chen",
    email: "michael@example.com",
    date: "18 Apr 2024",
    status: "Pending",
    total: 185_000,
  },
  {
    id: "#SDGT1250LM",
    customer: "Grace Adeyemi",
    email: "grace@example.com",
    date: "17 Apr 2024",
    status: "Delivered",
    total: 320_000,
  },
];

export const supportCustomers: SupportCustomer[] = [
  {
    id: "cust-1",
    name: "Ada Okonkwo",
    email: "ada@example.com",
    tickets: 3,
    lastContact: "20 Apr 2024",
  },
  {
    id: "cust-2",
    name: "John Doe",
    email: "john@example.com",
    tickets: 2,
    lastContact: "20 Apr 2024",
  },
  {
    id: "cust-3",
    name: "Sarah Kim",
    email: "sarah@example.com",
    tickets: 1,
    lastContact: "19 Apr 2024",
  },
  {
    id: "cust-4",
    name: "Michael Chen",
    email: "michael@example.com",
    tickets: 2,
    lastContact: "19 Apr 2024",
  },
  {
    id: "cust-5",
    name: "Grace Adeyemi",
    email: "grace@example.com",
    tickets: 1,
    lastContact: "18 Apr 2024",
  },
  {
    id: "cust-6",
    name: "David Wilson",
    email: "david@example.com",
    tickets: 1,
    lastContact: "17 Apr 2024",
  },
];

export const supportNavItems = [
  { label: "Dashboard", href: "/support", icon: "layout-dashboard" as const },
  { label: "Tickets", href: "/support/tickets", icon: "ticket" as const },
  { label: "Products", href: "/support/products", icon: "package" as const },
  { label: "Vendors", href: "/support/vendors", icon: "store" as const },
  { label: "Orders", href: "/support/orders", icon: "shopping-bag" as const },
  {
    label: "Track Order",
    href: "/support/track-order",
    icon: "truck" as const,
  },
  { label: "Customers", href: "/support/customers", icon: "users" as const },
  { label: "Inbox", href: "/support/inbox", icon: "inbox" as const },
] as const;

export const ticketPriorityStyles: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  high: { label: "High", className: "bg-red-100 text-red-800" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-800" },
  low: { label: "Low", className: "bg-blue-100 text-blue-800" },
};

export const ticketStatusStyles: Record<
  TicketStatus,
  { label: string; className: string }
> = {
  open: { label: "Open", className: "bg-coral/15 text-coral" },
  in_progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-800",
  },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-800" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-600" },
};
