import { AdminShell } from "@/components/admin/AdminShell";
import { AdminDashboardPanel } from "@/components/admin/AdminDashboardPanel";

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of your store performance"
    >
      <AdminDashboardPanel />
    </AdminShell>
  );
}
