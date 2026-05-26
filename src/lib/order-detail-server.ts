import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { backendFetchWithAuth } from "@/lib/backend";
import type { AdminTrackingDetail } from "@/data/admin-track-order";
import { SUPPORT_SESSION_COOKIE } from "@/lib/support-auth";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

type OrderPortal = "admin" | "vendor" | "support";

const portalConfig: Record<
  OrderPortal,
  { cookie: string; path: string }
> = {
  admin: { cookie: ADMIN_SESSION_COOKIE, path: "/orders/admin" },
  vendor: { cookie: VENDOR_SESSION_COOKIE, path: "/orders/vendor" },
  support: { cookie: SUPPORT_SESSION_COOKIE, path: "/orders/support" },
};

export async function getOrderDetailForPortal(
  portal: OrderPortal,
  slug: string
): Promise<AdminTrackingDetail | null> {
  const cookieStore = await cookies();
  const { cookie, path } = portalConfig[portal];
  const token = cookieStore.get(cookie)?.value;

  if (!token) {
    return null;
  }

  const response = await backendFetchWithAuth(`${path}/${slug}`, token);

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminTrackingDetail;
}
