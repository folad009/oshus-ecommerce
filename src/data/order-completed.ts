export interface OrderLineItem {
  id: string;
  name: string;
  category: string;
  subtotal: number;
  image: string;
}

export const completedOrder = {
  orderId: "#SDGT1254FD",
  paymentMethod: "Paystack",
  transactionId: "TR542SSFE",
  deliveryDate: "26 January 2025",
  items: [
    {
      id: "1",
      name: "SilkSculpt Serum",
      category: "Skin Care",
      subtotal: 140000,
      image:
        "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=120&h=120&fit=crop",
    },
    {
      id: "2",
      name: "VelvetGlow Foundation",
      category: "Makeup",
      subtotal: 84000,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop",
    },
    {
      id: "3",
      name: "HydraBloom Moisturizer",
      category: "Skin Care",
      subtotal: 48000,
      image:
        "https://images.unsplash.com/photo-1570194065595-8c2a7a0e2b0d?w=120&h=120&fit=crop",
    },
    {
      id: "4",
      name: "RosePetal Lip Tint",
      category: "Makeup",
      subtotal: 34000,
      image:
        "https://images.unsplash.com/photo-1586495777744-441de168c6a8?w=120&h=120&fit=crop",
    },
  ] satisfies OrderLineItem[],
  shipping: 0,
  taxes: 0,
  couponDiscount: 36000,
  total: 270000,
};
