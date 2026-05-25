export type PortalRole = "admin" | "vendor" | "support";

export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const COOKIE_NAMES: Record<PortalRole, string> = {
  admin: "oshus_admin_session",
  vendor: "oshus_vendor_session",
  support: "oshus_support_session",
};

function getAuthSecret(role: PortalRole): string {
  const roleSecret = process.env[`${role.toUpperCase()}_AUTH_SECRET`];
  return (
    roleSecret ??
    process.env.AUTH_SECRET ??
    `oshus-dev-${role}-secret-change-in-production`
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function signPayload(payload: string, role: PortalRole): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getAuthSecret(role)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  return toBase64Url(new Uint8Array(signature));
}

export function getPortalSessionCookieName(role: PortalRole): string {
  return COOKIE_NAMES[role];
}

export async function createPortalSessionToken(
  role: PortalRole,
  email: string
): Promise<string> {
  const exp = Date.now() + PORTAL_SESSION_MAX_AGE * 1000;
  const payload = `v2|${role}|${email}|${exp}`;
  const signature = await signPayload(payload, role);
  return `${payload}|${signature}`;
}

export async function getPortalSessionEmail(
  role: PortalRole,
  token: string | undefined
): Promise<string | null> {
  const { verifyJwtForPortal } = await import("@/lib/jwt-session");
  const claims = await verifyJwtForPortal(role, token);
  return claims?.email ?? null;
}

export async function verifyPortalSessionToken(
  role: PortalRole,
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split("|");
  if (parts.length !== 5 || parts[0] !== "v2" || parts[1] !== role) {
    return false;
  }

  const [, , email, expStr, signature] = parts;
  const exp = Number(expStr);

  if (!email || Number.isNaN(exp) || Date.now() > exp) return false;

  const payload = `v2|${role}|${email}|${exp}`;
  const expected = await signPayload(payload, role);

  return signature === expected;
}

export function getPortalSessionCookieOptions(
  maxAge = PORTAL_SESSION_MAX_AGE
) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
