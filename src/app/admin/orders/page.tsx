import { AdminShell } from "@/components/admin/AdminShell";
import { AdminOrdersPanel } from "@/components/admin/AdminOrdersPanel";

export default function AdminOrdersPage() {
  return (
    <AdminShell
      title="Orders"
      subtitle="View and manage customer orders"
    >
      <AdminOrdersPanel />
    </AdminShell>
  );
}
