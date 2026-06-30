import type { CartItem } from "@/types";

export interface PendingCheckoutSnapshot {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
}

const STORAGE_KEY = "oshus-pending-checkout";

export function savePendingCheckout(snapshot: PendingCheckoutSnapshot) {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function loadPendingCheckout(): PendingCheckoutSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as PendingCheckoutSnapshot;
  } catch {
    return null;
  }
}

export function clearPendingCheckout() {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.removeItem(STORAGE_KEY);
}
