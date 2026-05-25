import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StaffPortal } from "@/data/auth";
import { loginRoutes } from "@/data/auth";

interface StaffPortalLinksProps {
  activePortal: StaffPortal;
}

const staffPortals: { id: StaffPortal; label: string }[] = [
  { id: "admin", label: "Admin" },
  { id: "support", label: "Support" },
  { id: "vendor", label: "Vendor" },
];

const activeStyles: Record<StaffPortal, string> = {
  admin: "bg-brand text-white border-brand",
  support: "bg-navy text-white border-navy",
  vendor: "bg-navy-light text-white border-navy-light",
};

export function StaffPortalLinks({ activePortal }: StaffPortalLinksProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {staffPortals.map((portal) => (
        <Link
          key={portal.id}
          href={loginRoutes[portal.id]}
          className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
            activePortal === portal.id
              ? activeStyles[portal.id]
              : "border-border text-muted-foreground hover:border-foreground/40"
          )}
        >
          {portal.label}
        </Link>
      ))}
    </div>
  );
}
