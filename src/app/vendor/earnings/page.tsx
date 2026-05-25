import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorEarningsPanel } from "@/components/vendor/VendorEarningsPanel";

export default function VendorEarningsPage() {
  return (
    <VendorShell
      title="Earnings"
      subtitle="Track payouts and commissions"
    >
      <VendorEarningsPanel />
    </VendorShell>
  );
}
