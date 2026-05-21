import { SupportShell } from "@/components/support/SupportShell";
import { TicketsTable } from "@/components/support/TicketsTable";

export default function SupportTicketsPage() {
  return (
    <SupportShell
      title="Tickets"
      subtitle="View and respond to customer support tickets"
    >
      <TicketsTable />
    </SupportShell>
  );
}
