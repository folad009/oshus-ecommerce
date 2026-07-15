"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/types";

const STORAGE_KEY = "oshus-cart";

export interface AddToCartInput {
  id: string;
  productId: string;
  variantId?: string;
  variantLabel?: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
  addItem: (item: AddToCartInput, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function normalizeCartItem(item: CartItem & { productId?: string }): CartItem {
  return {
    ...item,
    productId: item.productId || item.id,
  };
}

function loadItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Array<CartItem & { productId?: string }>;
    return parsed.map(normalizeCartItem);
  } catch {
    return [];
  }
}

function saveItems(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function calculateTotals(items: CartItem[]) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const taxes = 0;
  const couponDiscount = 0;
  const total = subtotal + shipping + taxes - couponDiscount;

  return { itemCount, subtotal, shipping, taxes, couponDiscount, total };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveItems(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: AddToCartInput, quantity = 1) => {
    const amount = Math.max(1, quantity);
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + amount }
            : entry
        );
      }
      return [...prev, { ...item, quantity: amount }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => calculateTotals(items), [items]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      ...totals,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, hydrated, totals, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
