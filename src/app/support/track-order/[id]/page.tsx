import { notFound } from "next/navigation";
import { SupportShell } from "@/components/support/SupportShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import {
  getAdminTracking,
  getAllTrackableOrderSlugs,
} from "@/data/admin-track-order";

interface SupportTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllTrackableOrderSlugs().map((id) => ({ id }));
}

export default async function SupportTrackOrderDetailPage({
  params,
}: SupportTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = getAdminTracking(id);

  if (!order) {
    notFound();
  }

  return (
    <SupportShell
      title="Order Tracking"
      subtitle={`Fulfillment details for ${order.orderId}`}
    >
      <TrackOrderDetail
        order={order}
        basePath="/support"
        showStatusUpdate={false}
      />
    </SupportShell>
  );
}
