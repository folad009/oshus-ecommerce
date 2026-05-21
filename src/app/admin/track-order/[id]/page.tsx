import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { TrackOrderDetail } from "@/components/track-order/TrackOrderDetail";
import {
  getAdminTracking,
  getAllTrackableOrderSlugs,
} from "@/data/admin-track-order";

interface AdminTrackOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllTrackableOrderSlugs().map((id) => ({ id }));
}

export default async function AdminTrackOrderDetailPage({
  params,
}: AdminTrackOrderDetailPageProps) {
  const { id } = await params;
  const order = getAdminTracking(id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell
      title="Order Tracking"
      subtitle={`Fulfillment details for ${order.orderId}`}
    >
      <TrackOrderDetail order={order} basePath="/admin" />
    </AdminShell>
  );
}
