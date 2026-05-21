"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Truck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/data/admin";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
  "shopping-bag": ShoppingBag,
  users: Users,
  truck: Truck,
  settings: Settings,
} as const;

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navContent = (
    <>
      <div className="flex items-center gap-2 px-5 py-6 border-b border-white/10">
        <div className="size-9 bg-coral rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <div>
          <p className="font-bold text-white text-sm">Oshus Store</p>
          <p className="text-white/50 text-xs">Admin Panel</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {adminNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-coral text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors mb-1"
        >
          View Store
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="size-4" />
          Logout
        </Link>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[260px] bg-navy shrink-0 min-h-screen sticky top-0">
        {navContent}
      </aside>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] bg-navy flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
        {navContent}
      </aside>
    </>
  );
}

export function AdminMenuButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-border hover:bg-light-gray transition-colors"
      aria-label="Open menu"
    >
      <Menu className="size-5" />
    </button>
  );
}
