import { verifyJwtForPortal } from "@/lib/jwt-session";
import {
  getPortalSessionCookieName,
  getPortalSessionCookieOptions,
  PORTAL_SESSION_MAX_AGE,
} from "@/lib/portal-session";

export const ADMIN_SESSION_COOKIE = getPortalSessionCookieName("admin");
export const ADMIN_SESSION_MAX_AGE = PORTAL_SESSION_MAX_AGE;

export async function verifyAdminSessionToken(
  token: string | undefined
): Promise<boolean> {
  const claims = await verifyJwtForPortal("admin", token);
  return claims !== null;
}

export function getAdminSessionCookieOptions(
  maxAge = ADMIN_SESSION_MAX_AGE
) {
  return getPortalSessionCookieOptions(maxAge);
}
