import { adminOrders } from "@/data/admin";

const uniqueCustomers = Array.from(
  new Map(
    adminOrders.map((o) => [
      o.email,
      { name: o.customer, email: o.email, orders: 0 },
    ])
  ).values()
).map((customer) => ({
  ...customer,
  orders: adminOrders.filter((o) => o.email === customer.email).length,
}));

export function CustomersTable() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Customers</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Name
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Email
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Orders
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {uniqueCustomers.map((customer) => (
              <tr
                key={customer.email}
                className="border-t border-border hover:bg-light-gray/50 transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                  {customer.name}
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">
                  {customer.email}
                </td>
                <td className="px-5 py-3.5 text-sm text-foreground">
                  {customer.orders}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    className="text-xs text-forest font-medium hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
