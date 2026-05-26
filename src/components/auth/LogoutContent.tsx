"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthPortal } from "@/data/auth";
import { isProtectedPortal, loginRoutes } from "@/data/auth";

interface LogoutContentProps {
  redirectTo?: string;
  cancelHref?: string;
  description?: string;
  portal?: AuthPortal;
}

export function LogoutContent({
  redirectTo = "/login",
  cancelHref = "/account",
  description = "Are you sure you want to log out of your account? You will need to sign in again to access your orders and settings.",
  portal = "customer",
}: LogoutContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      if (portal === "customer") {
        await fetch("/api/auth/customer/logout", { method: "POST" });
        router.push(redirectTo);
        router.refresh();
        return;
      }

      if (isProtectedPortal(portal)) {
        await fetch(`/api/auth/${portal}/logout`, { method: "POST" });
        router.push(loginRoutes[portal]);
        router.refresh();
        return;
      }

      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10 text-center">
          <div className="size-16 rounded-full bg-cart-yellow/20 flex items-center justify-center mx-auto mb-6">
            <LogOut className="size-8 text-forest" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">Logout</h2>
          <p className="text-sm text-muted-foreground mb-8">{description}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={cancelHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-lg h-11 px-8 text-sm font-semibold"
              )}
            >
              Cancel
            </Link>
            <Button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold"
            >
              {loading ? "Logging out..." : "Confirm Logout"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
