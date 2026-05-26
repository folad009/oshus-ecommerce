import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPPORT_SESSION_COOKIE } from "@/lib/support-auth";

export async function requireSupportToken(): Promise<
  NextResponse | { token: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SUPPORT_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { verifyJwtForPortal } = await import("@/lib/jwt-session");
  const claims = await verifyJwtForPortal("support", token);

  if (!claims) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return { token };
}
