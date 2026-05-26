import { SupportShell } from "@/components/support/SupportShell";
import { SupportOrdersPanel } from "@/components/support/SupportOrdersPanel";

export default function SupportOrdersPage() {
  return (
    <SupportShell
      title="Orders"
      subtitle="Look up orders to assist customers"
    >
      <SupportOrdersPanel />
    </SupportShell>
  );
}
