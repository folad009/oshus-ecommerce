import { SupportShell } from "@/components/support/SupportShell";
import { SupportCustomersPanel } from "@/components/support/SupportCustomersPanel";

export default function SupportCustomersPage() {
  return (
    <SupportShell
      title="Customers"
      subtitle="Customers with support history"
    >
      <SupportCustomersPanel />
    </SupportShell>
  );
}
