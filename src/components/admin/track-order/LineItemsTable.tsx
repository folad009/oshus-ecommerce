import { formatNaira } from "@/data/checkout";
import type { AdminLineItem } from "@/data/admin-track-order";

interface LineItemsTableProps {
  items: AdminLineItem[];
}

export function LineItemsTable({ items }: LineItemsTableProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Line Items</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Product
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                SKU
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Qty
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3 text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-5 py-3 text-sm font-medium text-foreground">
                  {item.name}
                </td>
                <td className="px-5 py-3 text-sm text-muted-foreground">
                  {item.sku}
                </td>
                <td className="px-5 py-3 text-sm text-foreground">
                  {item.quantity}
                </td>
                <td className="px-5 py-3 text-sm font-medium text-foreground text-right">
                  {formatNaira(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-light-gray/50">
              <td
                colSpan={3}
                className="px-5 py-3 text-sm font-semibold text-foreground text-right"
              >
                Subtotal
              </td>
              <td className="px-5 py-3 text-sm font-bold text-navy text-right">
                {formatNaira(subtotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
