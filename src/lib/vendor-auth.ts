import { verifyJwtForPortal } from "@/lib/jwt-session";
import {
  getPortalSessionCookieName,
  getPortalSessionCookieOptions,
  PORTAL_SESSION_MAX_AGE,
} from "@/lib/portal-session";
export const VENDOR_SESSION_COOKIE = getPortalSessionCookieName("vendor");
export const VENDOR_SESSION_MAX_AGE = PORTAL_SESSION_MAX_AGE;

export async function verifyVendorSessionToken(
  token: string | undefined
): Promise<boolean> {
  const claims = await verifyJwtForPortal("vendor", token);
  return claims !== null;
}

export function getVendorSessionCookieOptions(
  maxAge = PORTAL_SESSION_MAX_AGE
) {
  return getPortalSessionCookieOptions(maxAge);
}
