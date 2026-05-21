import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  Package,
  Truck,
  PackageCheck,
} from "lucide-react";

export type OrderStepStatus = "completed" | "pending";

export interface OrderTrackingStep {
  id: string;
  label: string;
  date: string;
  status: OrderStepStatus;
  icon: LucideIcon;
}

export interface TrackedProduct {
  id: string;
  name: string;
  color: string;
  quantity: number;
  image: string;
}

export const trackedOrder = {
  orderId: "#SDGT1254FD",
  steps: [
    {
      id: "placed",
      label: "Order Placed",
      date: "20 Apr 2024, 11:00 AM",
      status: "completed" as const,
      icon: ClipboardCheck,
    },
    {
      id: "accepted",
      label: "Accepted",
      date: "20 Apr 2024, 11:15 AM",
      status: "completed" as const,
      icon: ClipboardCheck,
    },
    {
      id: "in-progress",
      label: "In Progress",
      date: "Expected 21 Apr 2024",
      status: "pending" as const,
      icon: Package,
    },
    {
      id: "on-the-way",
      label: "On the Way",
      date: "Expected 22,23 Apr 2024",
      status: "pending" as const,
      icon: Truck,
    },
    {
      id: "delivered",
      label: "Delivered",
      date: "Expected 24 Apr 2024",
      status: "pending" as const,
      icon: PackageCheck,
    },
  ] satisfies OrderTrackingStep[],
  products: [
    {
      id: "1",
      name: "SilkSculpt Serum",
      color: "Clear",
      quantity: 4,
      image:
        "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=120&h=120&fit=crop",
    },
    {
      id: "2",
      name: "VelvetGlow Foundation",
      color: "Beige",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop",
    },
    {
      id: "3",
      name: "HydraBloom Moisturizer",
      color: "White",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1570194065595-8c2a7a0e2b0d?w=120&h=120&fit=crop",
    },
    {
      id: "4",
      name: "RosePetal Lip Tint",
      color: "Rose",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1586495777744-441de168c6a8?w=120&h=120&fit=crop",
    },
  ] satisfies TrackedProduct[],
};

export const trackOrderFeatures = [
  {
    title: "Free Shipping",
    description: "Free shipping for order above ₦50,000",
    icon: "truck" as const,
  },
  {
    title: "Flexible Payment",
    description: "Multiple secure payment options",
    icon: "credit-card" as const,
  },
  {
    title: "24x7 Support",
    description: "We support online all days",
    icon: "headphones" as const,
  },
];
