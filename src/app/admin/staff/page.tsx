import { AdminShell } from "@/components/admin/AdminShell";
import { StaffAccountsPanel } from "@/components/admin/StaffAccountsPanel";

export default function AdminStaffPage() {
  return (
    <AdminShell
      title="Staff"
      subtitle="Create and manage vendor and support portal accounts"
    >
      <StaffAccountsPanel />
    </AdminShell>
  );
}
