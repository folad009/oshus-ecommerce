import { supportCustomers, type SupportCustomer } from "@/data/support";

interface CustomersTableProps {
  customers?: SupportCustomer[];
}

export function CustomersTable({
  customers = supportCustomers,
}: CustomersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Customers</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Customers with recent support interactions
        </p>
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
                Tickets
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Last Contact
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-border hover:bg-light-gray/50 transition-colors"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                  {customer.name}
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">
                  {customer.email}
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                  {customer.tickets}
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">
                  {customer.lastContact}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    className="text-sm text-forest font-medium hover:underline"
                  >
                    View history
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
