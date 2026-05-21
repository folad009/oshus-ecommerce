import Link from "next/link";
import { cn } from "@/lib/utils";
import { adminOrders, statusStyles } from "@/data/admin";
import { orderIdToSlug } from "@/lib/order-id";
import { formatNaira } from "@/data/checkout";

interface RecentOrdersPanelProps {
  basePath?: string;
}

export function RecentOrdersPanel({ basePath = "/admin" }: RecentOrdersPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Select an order to view fulfillment details
        </p>
      </div>
      <ul className="divide-y divide-border">
        {adminOrders.map((order) => {
          const status = statusStyles[order.status];
          const slug = orderIdToSlug(order.id);
          return (
            <li key={order.id}>
              <Link
                href={`${basePath}/track-order/${slug}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-light-gray/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-forest">{order.id}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {order.customer} · {order.date}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-foreground hidden sm:inline">
                    {formatNaira(order.total)}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
