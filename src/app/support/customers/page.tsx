import { SupportShell } from "@/components/support/SupportShell";
import { CustomersTable } from "@/components/support/CustomersTable";

export default function SupportCustomersPage() {
  return (
    <SupportShell
      title="Customers"
      subtitle="Customers with support history"
    >
      <CustomersTable />
    </SupportShell>
  );
}
