import { VendorShell } from "@/components/vendor/VendorShell";
import { OrderSearchPanel } from "@/components/admin/track-order/OrderSearchPanel";
import { VendorRecentOrdersPanel } from "@/components/vendor/VendorRecentOrdersPanel";

export default function VendorTrackOrderPage() {
  return (
    <VendorShell
      title="Track Order"
      subtitle="Search and monitor order fulfillment"
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        <OrderSearchPanel basePath="/vendor" />
        <VendorRecentOrdersPanel />
      </div>
    </VendorShell>
  );
}
