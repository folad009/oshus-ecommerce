import type { OrderStatus } from "@/data/admin";
import { adminOrders } from "@/data/admin";
import { orderIdToSlug, slugToOrderId } from "@/lib/order-id";

export type FulfillmentStepStatus = "completed" | "current" | "pending";

export interface FulfillmentStep {
  id: string;
  label: string;
  timestamp: string;
  note?: string;
  status: FulfillmentStepStatus;
}

export interface AdminLineItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface ActivityEntry {
  id: string;
  time: string;
  actor: string;
  action: string;
}

export interface AdminTrackingDetail {
  orderId: string;
  status: OrderStatus;
  customer: string;
  email: string;
  phone: string;
  placedAt: string;
  paymentMethod: string;
  shippingAddress: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  total: number;
  items: number;
  fulfillmentSteps: FulfillmentStep[];
  lineItems: AdminLineItem[];
  activityLog: ActivityEntry[];
}

const defaultLineItems: AdminLineItem[] = [
  {
    id: "1",
    name: "SilkSculpt Serum",
    sku: "SS-001",
    quantity: 2,
    price: 45_000,
  },
  {
    id: "2",
    name: "VelvetGlow Foundation",
    sku: "VG-002",
    quantity: 1,
    price: 32_000,
  },
];

const processingDetail: AdminTrackingDetail = {
  orderId: "#SDGT1254FD",
  status: "processing",
  customer: "Ada Okonkwo",
  email: "ada@example.com",
  phone: "+234 801 234 5678",
  placedAt: "20 Apr 2024, 11:00 AM",
  paymentMethod: "Paystack",
  shippingAddress: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  carrier: "GIG Logistics",
  trackingNumber: "GIG-8847291-NG",
  estimatedDelivery: "24 Apr 2024",
  total: 270_000,
  items: 4,
  fulfillmentSteps: [
    {
      id: "placed",
      label: "Order placed",
      timestamp: "20 Apr 2024, 11:00 AM",
      status: "completed",
    },
    {
      id: "paid",
      label: "Payment confirmed (Paystack)",
      timestamp: "20 Apr 2024, 11:02 AM",
      status: "completed",
    },
    {
      id: "processing",
      label: "Warehouse processing",
      timestamp: "20 Apr 2024, 2:30 PM",
      note: "Picking items from inventory",
      status: "current",
    },
    {
      id: "shipped",
      label: "Shipped to carrier",
      timestamp: "Pending",
      status: "pending",
    },
    {
      id: "delivered",
      label: "Delivered to customer",
      timestamp: "Expected 24 Apr 2024",
      status: "pending",
    },
  ],
  lineItems: defaultLineItems,
  activityLog: [
    {
      id: "1",
      time: "20 Apr 2024, 2:30 PM",
      actor: "System",
      action: "Order moved to processing",
    },
    {
      id: "2",
      time: "20 Apr 2024, 11:02 AM",
      actor: "Paystack",
      action: "Payment confirmed — ₦270,000",
    },
    {
      id: "3",
      time: "20 Apr 2024, 11:00 AM",
      actor: "Ada Okonkwo",
      action: "Order placed",
    },
  ],
};

const shippedDetail: AdminTrackingDetail = {
  ...processingDetail,
  orderId: "#SDGT1253AB",
  status: "shipped",
  customer: "John Doe",
  email: "john@example.com",
  phone: "+234 802 345 6789",
  placedAt: "19 Apr 2024, 3:15 PM",
  total: 150_000,
  items: 2,
  trackingNumber: "GIG-7729104-NG",
  estimatedDelivery: "22 Apr 2024",
  fulfillmentSteps: [
    {
      id: "placed",
      label: "Order placed",
      timestamp: "19 Apr 2024, 3:15 PM",
      status: "completed",
    },
    {
      id: "paid",
      label: "Payment confirmed (Paystack)",
      timestamp: "19 Apr 2024, 3:17 PM",
      status: "completed",
    },
    {
      id: "processing",
      label: "Warehouse processing",
      timestamp: "19 Apr 2024, 5:00 PM",
      status: "completed",
    },
    {
      id: "shipped",
      label: "Shipped to carrier",
      timestamp: "20 Apr 2024, 9:00 AM",
      note: "Handed to GIG Logistics",
      status: "current",
    },
    {
      id: "delivered",
      label: "Delivered to customer",
      timestamp: "Expected 22 Apr 2024",
      status: "pending",
    },
  ],
  activityLog: [
    {
      id: "1",
      time: "20 Apr 2024, 9:00 AM",
      actor: "Admin User",
      action: "Order marked as shipped",
    },
    {
      id: "2",
      time: "19 Apr 2024, 3:17 PM",
      actor: "Paystack",
      action: "Payment confirmed — ₦150,000",
    },
    {
      id: "3",
      time: "19 Apr 2024, 3:15 PM",
      actor: "John Doe",
      action: "Order placed",
    },
  ],
};

const deliveredDetail: AdminTrackingDetail = {
  ...processingDetail,
  orderId: "#SDGT1252XY",
  status: "delivered",
  customer: "Sarah Kim",
  email: "sarah@example.com",
  total: 48_000,
  items: 1,
  trackingNumber: "GIG-6612048-NG",
  estimatedDelivery: "18 Apr 2024",
  fulfillmentSteps: processingDetail.fulfillmentSteps.map((s) => ({
    ...s,
    status: "completed" as const,
    timestamp:
      s.id === "delivered" ? "18 Apr 2024, 4:20 PM" : s.timestamp,
  })),
  activityLog: [
    {
      id: "1",
      time: "18 Apr 2024, 4:20 PM",
      actor: "System",
      action: "Order delivered",
    },
    {
      id: "2",
      time: "17 Apr 2024, 10:00 AM",
      actor: "Admin User",
      action: "Order marked as shipped",
    },
    {
      id: "3",
      time: "18 Apr 2024, 9:00 AM",
      actor: "Sarah Kim",
      action: "Order placed",
    },
  ],
};

const pendingDetail: AdminTrackingDetail = {
  ...processingDetail,
  orderId: "#SDGT1251PQ",
  status: "pending",
  customer: "Michael Chen",
  email: "michael@example.com",
  total: 185_000,
  items: 3,
  trackingNumber: "—",
  carrier: "—",
  fulfillmentSteps: [
    {
      id: "placed",
      label: "Order placed",
      timestamp: "18 Apr 2024, 9:00 AM",
      status: "completed",
    },
    {
      id: "paid",
      label: "Awaiting payment confirmation",
      timestamp: "Pending",
      status: "current",
    },
    {
      id: "processing",
      label: "Warehouse processing",
      timestamp: "—",
      status: "pending",
    },
    {
      id: "shipped",
      label: "Shipped to carrier",
      timestamp: "—",
      status: "pending",
    },
    {
      id: "delivered",
      label: "Delivered to customer",
      timestamp: "—",
      status: "pending",
    },
  ],
  activityLog: [
    {
      id: "1",
      time: "18 Apr 2024, 9:00 AM",
      actor: "Michael Chen",
      action: "Order placed — payment pending",
    },
  ],
};

const cancelledDetail: AdminTrackingDetail = {
  ...processingDetail,
  orderId: "#SDGT1249RS",
  status: "cancelled",
  customer: "David Wilson",
  email: "david@example.com",
  total: 95_000,
  items: 2,
  trackingNumber: "—",
  carrier: "—",
  estimatedDelivery: "—",
  fulfillmentSteps: [
    {
      id: "placed",
      label: "Order placed",
      timestamp: "17 Apr 2024, 2:00 PM",
      status: "completed",
    },
    {
      id: "cancelled",
      label: "Order cancelled",
      timestamp: "17 Apr 2024, 4:30 PM",
      note: "Cancelled by customer request",
      status: "current",
    },
  ],
  activityLog: [
    {
      id: "1",
      time: "17 Apr 2024, 4:30 PM",
      actor: "Admin User",
      action: "Order cancelled",
    },
    {
      id: "2",
      time: "17 Apr 2024, 2:00 PM",
      actor: "David Wilson",
      action: "Order placed",
    },
  ],
};

export const adminTrackingBySlug: Record<string, AdminTrackingDetail> = {
  [orderIdToSlug("#SDGT1254FD")]: processingDetail,
  [orderIdToSlug("#SDGT1253AB")]: shippedDetail,
  [orderIdToSlug("#SDGT1252XY")]: deliveredDetail,
  [orderIdToSlug("#SDGT1250LM")]: {
    ...deliveredDetail,
    orderId: "#SDGT1250LM",
    customer: "Grace Adeyemi",
    email: "grace@example.com",
    total: 320_000,
    items: 5,
  },
  [orderIdToSlug("#SDGT1251PQ")]: pendingDetail,
  [orderIdToSlug("#SDGT1249RS")]: cancelledDetail,
};

export function getAdminTracking(slug: string): AdminTrackingDetail | null {
  return adminTrackingBySlug[slug] ?? null;
}

export function getAllTrackableOrderSlugs(): string[] {
  return adminOrders.map((o) => orderIdToSlug(o.id));
}

export { slugToOrderId };
