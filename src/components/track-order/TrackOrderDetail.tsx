import Link from "next/link";
import { TrackOrderBreadcrumb } from "@/components/admin/track-order/TrackOrderBreadcrumb";
import { FulfillmentTimeline } from "@/components/admin/track-order/FulfillmentTimeline";
import { OrderDetailPanel } from "@/components/admin/track-order/OrderDetailPanel";
import { LineItemsTable } from "@/components/admin/track-order/LineItemsTable";
import { ActivityLog } from "@/components/admin/track-order/ActivityLog";
import { StatusUpdateBar } from "@/components/admin/track-order/StatusUpdateBar";
import type { AdminTrackingDetail } from "@/data/admin-track-order";

interface TrackOrderDetailProps {
  order: AdminTrackingDetail;
  basePath: string;
  showStatusUpdate?: boolean;
  orderSlug?: string;
  statusApiPath?: string;
}

export function TrackOrderDetail({
  order,
  basePath,
  showStatusUpdate = true,
  orderSlug,
  statusApiPath = "/api/admin/orders",
}: TrackOrderDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <TrackOrderBreadcrumb orderId={order.orderId} basePath={basePath} />

      {showStatusUpdate && orderSlug && (
        <StatusUpdateBar
          currentStatus={order.status}
          orderSlug={orderSlug}
          statusApiPath={statusApiPath}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <FulfillmentTimeline steps={order.fulfillmentSteps} />
          <LineItemsTable items={order.lineItems} />
        </div>
        <div className="flex flex-col gap-6">
          <OrderDetailPanel order={order} />
          <Link
            href={`${basePath}/orders`}
            className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
          >
            Back to all orders
          </Link>
        </div>
      </div>

      <ActivityLog entries={order.activityLog} />
    </div>
  );
}
