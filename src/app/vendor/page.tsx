import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorDashboardPanel } from "@/components/vendor/VendorDashboardPanel";

export default function VendorDashboardPage() {
  return (
    <VendorShell
      title="Dashboard"
      subtitle="Overview of your store on Oshus"
    >
      <VendorDashboardPanel />
    </VendorShell>
  );
}
