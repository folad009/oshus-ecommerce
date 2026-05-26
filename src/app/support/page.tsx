import { SupportShell } from "@/components/support/SupportShell";
import { SupportDashboardPanel } from "@/components/support/SupportDashboardPanel";

export default function SupportDashboardPage() {
  return (
    <SupportShell
      title="Dashboard"
      subtitle="Manage customer support and inquiries"
    >
      <SupportDashboardPanel />
    </SupportShell>
  );
}
