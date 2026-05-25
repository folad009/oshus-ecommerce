"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

export function SiteHeaderWrapper() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/support") ||
    pathname.startsWith("/vendor")
  ) {
    return null;
  }

  return <SiteHeader />;
}
