import Link from "next/link";
import { supportOrders, type SupportOrderLookup } from "@/data/support";
import { formatNaira } from "@/data/checkout";
import { orderIdToSlug } from "@/lib/order-id";

interface OrdersLookupTableProps {
  orders?: SupportOrderLookup[];
}

export function OrdersLookupTable({
  orders = supportOrders,
}: OrdersLookupTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Order Lookup</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Search and assist customers with their orders
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
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
                Status
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Total
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-light-gray/50 transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-forest">
                  {order.id}
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-medium text-foreground">
                    {order.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">
                  {order.date}
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                  {formatNaira(order.total)}
                </td>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/support/track-order/${orderIdToSlug(order.id)}`}
                    className="text-sm text-forest font-medium hover:underline"
                  >
                    Track
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
