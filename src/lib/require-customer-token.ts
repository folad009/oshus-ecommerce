import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/customer-auth";

export async function requireCustomerToken(): Promise<
  NextResponse | { token: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { verifyJwtForPortal } = await import("@/lib/jwt-session");
  const claims = await verifyJwtForPortal("customer", token);

  if (!claims) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return { token };
}
