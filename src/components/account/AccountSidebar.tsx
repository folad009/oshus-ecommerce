"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { accountMenuItems, type AccountMenuId } from "@/data/account";

interface AccountSidebarProps {
  activeId: AccountMenuId;
  onSelect: (id: AccountMenuId) => void;
}

export function AccountSidebar({ activeId, onSelect }: AccountSidebarProps) {
  const router = useRouter();

  return (
    <nav className="flex flex-col gap-3">
      {accountMenuItems.map((item) => {
        const isActive = activeId === item.id;
        const isLogout = item.id === "logout";

        if (isLogout) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push("/logout")}
              className="w-full text-left px-5 py-4 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:bg-light-gray transition-colors"
            >
              {item.label}
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-colors",
              isActive
                ? "bg-cart-yellow border-cart-yellow text-foreground"
                : "bg-white border-border text-foreground hover:bg-light-gray"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
