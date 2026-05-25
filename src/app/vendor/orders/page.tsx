import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorOrdersTable } from "@/components/vendor/VendorOrdersTable";

export default function VendorOrdersPage() {
  return (
    <VendorShell
      title="Orders"
      subtitle="Orders containing your products"
    >
      <VendorOrdersTable />
    </VendorShell>
  );
}
