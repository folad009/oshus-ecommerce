import { StaffAccountsPanel } from "@/components/admin/StaffAccountsPanel";
import { SupportShell } from "@/components/support/SupportShell";

export default function SupportVendorsPage() {
  return (
    <SupportShell
      title="Vendors"
      subtitle="Create and manage vendor portal accounts"
    >
      <StaffAccountsPanel apiBase="/api/support/vendors" vendorsOnly />
    </SupportShell>
  );
}
