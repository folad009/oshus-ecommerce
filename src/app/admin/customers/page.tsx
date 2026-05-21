import { AdminShell } from "@/components/admin/AdminShell";
import { CustomersTable } from "@/components/admin/CustomersTable";

export default function AdminCustomersPage() {
  return (
    <AdminShell
      title="Customers"
      subtitle="View registered customers"
    >
      <CustomersTable />
    </AdminShell>
  );
}
