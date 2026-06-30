import type { CartItem } from "@/types";

export interface CompletedOrderSnapshot {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
  placedAt: string;
}

const STORAGE_KEY = "oshus-last-order";

export function saveCompletedOrder(order: CompletedOrderSnapshot) {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function loadCompletedOrder(): CompletedOrderSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as CompletedOrderSnapshot;
  } catch {
    return null;
  }
}
