import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { SUPPORT_SESSION_COOKIE } from "@/lib/support-auth";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

export async function requireProductManagerToken(): Promise<
  NextResponse | { token: string }
> {
  const cookieStore = await cookies();
  const { verifyJwtForPortal } = await import("@/lib/jwt-session");

  const candidates = [
    { portal: "admin" as const, cookie: ADMIN_SESSION_COOKIE },
    { portal: "support" as const, cookie: SUPPORT_SESSION_COOKIE },
    { portal: "vendor" as const, cookie: VENDOR_SESSION_COOKIE },
  ];

  for (const { portal, cookie } of candidates) {
    const token = cookieStore.get(cookie)?.value;
    if (!token) {
      continue;
    }

    const claims = await verifyJwtForPortal(portal, token);
    if (claims) {
      return { token };
    }
  }

  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}
