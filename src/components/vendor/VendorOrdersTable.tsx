import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { orderIdToSlug } from "@/lib/order-id";
import {
  vendorOrders,
  vendorOrderStatusStyles,
  type VendorOrder,
} from "@/data/vendor";

interface VendorOrdersTableProps {
  orders?: VendorOrder[];
  showViewAll?: boolean;
}

export function VendorOrdersTable({
  orders = vendorOrders,
  showViewAll = false,
}: VendorOrdersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
        {showViewAll && (
          <Link
            href="/vendor/orders"
            className="text-sm text-navy-light font-medium hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Order ID
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Customer
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Date
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Total
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Commission
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Status
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = vendorOrderStatusStyles[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-t border-border hover:bg-light-gray/50 transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-navy-light">
                    {order.id}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {formatNaira(order.total)}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gold">
                    {formatNaira(order.commission)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
