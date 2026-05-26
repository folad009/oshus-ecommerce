import { OrderStatus } from "@prisma/client";

export function formatOrderNumber(orderNumber: string): string {
  return orderNumber.startsWith("#") ? orderNumber : `#${orderNumber}`;
}

export function parseOrderNumber(value: string): string {
  return value.replace(/^#/, "").toUpperCase();
}

export function formatOrderDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function toClientOrderStatus(
  status: OrderStatus
): "pending" | "processing" | "shipped" | "delivered" | "cancelled" {
  return status.toLowerCase() as
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
}

export function toPrismaOrderStatus(
  status: string
): OrderStatus | null {
  const map: Record<string, OrderStatus> = {
    pending: OrderStatus.PENDING,
    processing: OrderStatus.PROCESSING,
    shipped: OrderStatus.SHIPPED,
    delivered: OrderStatus.DELIVERED,
    cancelled: OrderStatus.CANCELLED,
  };
  return map[status] ?? null;
}
