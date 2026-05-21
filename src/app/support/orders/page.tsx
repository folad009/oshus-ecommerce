import { SupportShell } from "@/components/support/SupportShell";
import { OrdersLookupTable } from "@/components/support/OrdersLookupTable";

export default function SupportOrdersPage() {
  return (
    <SupportShell
      title="Orders"
      subtitle="Look up orders to assist customers"
    >
      <OrdersLookupTable />
    </SupportShell>
  );
}
