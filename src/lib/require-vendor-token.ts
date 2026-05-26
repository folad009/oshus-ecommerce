import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

export async function requireVendorToken(): Promise<
  NextResponse | { token: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(VENDOR_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { verifyJwtForPortal } = await import("@/lib/jwt-session");
  const claims = await verifyJwtForPortal("vendor", token);

  if (!claims) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return { token };
}
