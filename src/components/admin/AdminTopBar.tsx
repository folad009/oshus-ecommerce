import { Bell } from "lucide-react";
import { AdminMenuButton } from "@/components/admin/AdminSidebar";

interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  onMenuOpen: () => void;
}

export function AdminTopBar({ title, subtitle, onMenuOpen }: AdminTopBarProps) {
  return (
    <header className="bg-white border-b border-border px-4 md:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-3 min-w-0">
        <AdminMenuButton onOpen={onMenuOpen} />
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          className="relative size-9 rounded-lg border border-border flex items-center justify-center hover:bg-light-gray transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4 text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 size-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <div className="size-9 rounded-full bg-forest flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@oshusstore.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
