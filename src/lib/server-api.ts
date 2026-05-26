import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/customer-auth";
import { backendFetchWithAuth } from "@/lib/backend";
import { SUPPORT_SESSION_COOKIE } from "@/lib/support-auth";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

type Portal = "admin" | "vendor" | "support" | "customer";

const cookieByPortal: Record<Portal, string> = {
  admin: ADMIN_SESSION_COOKIE,
  vendor: VENDOR_SESSION_COOKIE,
  support: SUPPORT_SESSION_COOKIE,
  customer: CUSTOMER_SESSION_COOKIE,
};

export async function fetchWithPortalAuth<T>(
  portal: Portal,
  path: string,
  init?: RequestInit
): Promise<T | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieByPortal[portal])?.value;

  if (!token) {
    return null;
  }

  const response = await backendFetchWithAuth(path, token, init);

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}
