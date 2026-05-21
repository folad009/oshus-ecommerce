import { SupportShell } from "@/components/support/SupportShell";
import { OrderSearchPanel } from "@/components/admin/track-order/OrderSearchPanel";
import { RecentOrdersPanel } from "@/components/admin/track-order/RecentOrdersPanel";

export default function SupportTrackOrderPage() {
  return (
    <SupportShell
      title="Track Order"
      subtitle="Search and monitor order fulfillment"
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        <OrderSearchPanel basePath="/support" />
        <RecentOrdersPanel basePath="/support" />
      </div>
    </SupportShell>
  );
}
