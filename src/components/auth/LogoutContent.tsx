"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LogoutContent() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10 text-center">
          <div className="size-16 rounded-full bg-cart-yellow/20 flex items-center justify-center mx-auto mb-6">
            <LogOut className="size-8 text-forest" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">Logout</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Are you sure you want to log out of your account? You will need to
            sign in again to access your orders and settings.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account"
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
              className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold"
            >
              Confirm Logout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
