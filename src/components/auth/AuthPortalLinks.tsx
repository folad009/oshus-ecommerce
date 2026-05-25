import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AuthPortal } from "@/data/auth";
import { loginRoutes } from "@/data/auth";

interface AuthPortalLinksProps {
  activePortal: Extract<AuthPortal, "customer" | "vendor">;
}

const portals: { id: AuthPortal; label: string }[] = [
  { id: "customer", label: "Customer" },
  { id: "vendor", label: "Vendor" },
];

export function AuthPortalLinks({ activePortal }: AuthPortalLinksProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {portals.map((portal) => (
        <Link
          key={portal.id}
          href={loginRoutes[portal.id]}
          className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
            activePortal === portal.id
              ? portal.id === "vendor"
                ? "bg-navy-light text-white border-navy-light"
                : "bg-forest text-white border-forest"
              : "border-border text-muted-foreground hover:border-forest hover:text-forest"
          )}
        >
          {portal.label}
        </Link>
      ))}
    </div>
  );
}
