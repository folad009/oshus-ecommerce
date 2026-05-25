import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor | Oshus Store",
  description: "Oshus Store vendor portal",
};

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
