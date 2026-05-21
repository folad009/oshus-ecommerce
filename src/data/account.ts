export const accountMenuItems = [
  { id: "personal", label: "Personal Information" },
  { id: "orders", label: "My Orders" },
  { id: "address", label: "Manage Address" },
  { id: "payment", label: "Payment Method" },
  { id: "password", label: "Password Manager" },
  { id: "logout", label: "Logout" },
] as const;

export type AccountMenuId = (typeof accountMenuItems)[number]["id"];

export const accountFeatures = [
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
