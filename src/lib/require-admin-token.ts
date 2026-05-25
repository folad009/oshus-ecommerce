import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function requireAdminToken(): Promise<
  NextResponse | { token: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { verifyJwtForPortal } = await import("@/lib/jwt-session");
  const claims = await verifyJwtForPortal("admin", token);

  if (!claims) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return { token };
}
