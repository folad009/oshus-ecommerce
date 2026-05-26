import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorOrdersPanel } from "@/components/vendor/VendorOrdersPanel";

export default function VendorOrdersPage() {
  return (
    <VendorShell
      title="Orders"
      subtitle="Orders containing your products"
    >
      <VendorOrdersPanel />
    </VendorShell>
  );
}
