import { SupportShell } from "@/components/support/SupportShell";
import { SupportTicketsPanel } from "@/components/support/SupportTicketsPanel";

export default function SupportTicketsPage() {
  return (
    <SupportShell
      title="Tickets"
      subtitle="View and respond to customer support tickets"
    >
      <SupportTicketsPanel />
    </SupportShell>
  );
}
