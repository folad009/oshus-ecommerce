import type { CartItem } from "@/types";

export const cartItems: CartItem[] = [
  {
    id: "cart-1",
    name: "Monstera deliciosa",
    category: "Indoor Plant",
    price: 12500,
    quantity: 4,
    image:
      "https://images.unsplash.com/photo-1614594975524-2b654bac2c4c?w=120&h=120&fit=crop",
  },
  {
    id: "cart-2",
    name: "Snake Plant Laurentii",
    category: "Indoor Plant",
    price: 18000,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1593482893169-ee6fdcf6c0f1?w=120&h=120&fit=crop",
  },
  {
    id: "cart-3",
    name: "Fiddle Leaf Fig",
    category: "Indoor Plant",
    price: 24000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1459411552885-673cd642d4d8?w=120&h=120&fit=crop",
  },
  {
    id: "cart-4",
    name: "Peace Lily",
    category: "Indoor Plant",
    price: 15000,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de2?w=120&h=120&fit=crop",
  },
];

export const cartSummary = {
  itemCount: 9,
  subtotal: 160000,
  shipping: 0,
  taxes: 0,
  couponDiscount: 10000,
  total: 150000,
};
