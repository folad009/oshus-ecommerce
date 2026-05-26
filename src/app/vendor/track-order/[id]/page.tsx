import { notFound } from "next/navigation";
import { VendorShell } from "@/components/vendor/VendorShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import { getOrderDetailForPortal } from "@/lib/order-detail-server";

interface VendorTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VendorTrackOrderDetailPage({
  params,
}: VendorTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderDetailForPortal("vendor", id);

  if (!order) {
    notFound();
  }

  return (
    <VendorShell
      title="Order Tracking"
      subtitle={`Fulfillment details for ${order.orderId}`}
    >
      <TrackOrderDetail
        order={order}
        basePath="/vendor"
        showStatusUpdate={false}
      />
    </VendorShell>
  );
}
