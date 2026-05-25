import { verifyJwtForPortal } from "@/lib/jwt-session";
import {
  getPortalSessionCookieName,
  getPortalSessionCookieOptions,
  PORTAL_SESSION_MAX_AGE,
} from "@/lib/portal-session";
export const SUPPORT_SESSION_COOKIE = getPortalSessionCookieName("support");
export const SUPPORT_SESSION_MAX_AGE = PORTAL_SESSION_MAX_AGE;

export async function verifySupportSessionToken(
  token: string | undefined
): Promise<boolean> {
  const claims = await verifyJwtForPortal("support", token);
  return claims !== null;
}

export function getSupportSessionCookieOptions(
  maxAge = SUPPORT_SESSION_MAX_AGE
) {
  return getPortalSessionCookieOptions(maxAge);
}
