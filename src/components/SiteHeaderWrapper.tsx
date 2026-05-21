"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

export function SiteHeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/support")) {
    return null;
  }

  return <SiteHeader />;
}
