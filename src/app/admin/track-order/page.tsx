import { AdminShell } from "@/components/admin/AdminShell";
import { OrderSearchPanel } from "@/components/admin/track-order/OrderSearchPanel";
import { RecentOrdersPanel } from "@/components/admin/track-order/RecentOrdersPanel";

export default function AdminTrackOrderPage() {
  return (
    <AdminShell
      title="Track Order"
      subtitle="Search and monitor order fulfillment"
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        <OrderSearchPanel />
        <RecentOrdersPanel />
      </div>
    </AdminShell>
  );
}
