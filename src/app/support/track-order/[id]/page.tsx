import { notFound } from "next/navigation";
import { SupportShell } from "@/components/support/SupportShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import { getOrderDetailForPortal } from "@/lib/order-detail-server";

interface SupportTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SupportTrackOrderDetailPage({
  params,
}: SupportTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderDetailForPortal("support", id);

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
