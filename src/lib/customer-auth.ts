import { verifyJwtForPortal } from "@/lib/jwt-session";
import { getPortalSessionCookieOptions, PORTAL_SESSION_MAX_AGE } from "@/lib/portal-session";

export const CUSTOMER_SESSION_COOKIE = "oshus_customer_session";
export const CUSTOMER_SESSION_MAX_AGE = PORTAL_SESSION_MAX_AGE;

export async function verifyCustomerSessionToken(
  token: string | undefined
): Promise<boolean> {
  const claims = await verifyJwtForPortal("customer", token);
  return claims !== null;
}

export function getCustomerSessionCookieOptions(
  maxAge = CUSTOMER_SESSION_MAX_AGE
) {
  return getPortalSessionCookieOptions(maxAge);
}
