import { notFound } from "next/navigation";
import { VendorShell } from "@/components/vendor/VendorShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import {
  getAdminTracking,
  getAllTrackableOrderSlugs,
} from "@/data/admin-track-order";

interface VendorTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllTrackableOrderSlugs().map((id) => ({ id }));
}

export default async function VendorTrackOrderDetailPage({
  params,
}: VendorTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = getAdminTracking(id);

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
