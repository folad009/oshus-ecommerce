import { jwtVerify } from "jose";
export type SessionPortal = "admin" | "vendor" | "support" | "customer";

interface JwtClaims {
  sub: string;
  email: string;
  role: string;
}

const roleMap: Record<SessionPortal, string> = {
  admin: "ADMIN",
  vendor: "VENDOR",
  support: "SUPPORT",
  customer: "CUSTOMER",
};

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ?? "oshus-dev-jwt-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function verifyJwtForPortal(
  portal: SessionPortal,
  token: string | undefined
): Promise<JwtClaims | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const email = typeof payload.email === "string" ? payload.email : null;
    const role = typeof payload.role === "string" ? payload.role : null;
    const sub = typeof payload.sub === "string" ? payload.sub : null;

    if (!email || !role || !sub || role !== roleMap[portal]) {
      return null;
    }

    return { sub, email, role };
  } catch {
    return null;
  }
}
