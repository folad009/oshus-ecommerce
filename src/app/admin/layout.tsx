import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Oshus Store",
  description: "Oshus Store admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
