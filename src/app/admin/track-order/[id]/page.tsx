import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import { getOrderDetailForPortal } from "@/lib/order-detail-server";

interface AdminTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTrackOrderDetailPage({
  params,
}: AdminTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderDetailForPortal("admin", id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell
      title="Order Tracking"
      subtitle={`Fulfillment details for ${order.orderId}`}
    >
      <TrackOrderDetail
        order={order}
        basePath="/admin"
        orderSlug={id}
        statusApiPath="/api/admin/orders"
      />
    </AdminShell>
  );
}
