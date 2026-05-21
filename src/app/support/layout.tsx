import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Oshus Store",
  description: "Oshus Store support agent portal",
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
