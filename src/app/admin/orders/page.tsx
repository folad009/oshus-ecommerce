import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default function AdminOrdersPage() {
  return (
    <AdminShell
      title="Orders"
      subtitle="View and manage customer orders"
    >
      <OrdersTable />
    </AdminShell>
  );
}
