import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPortalSessionEmail } from "@/lib/portal-session";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

export async function requireVendorSession(): Promise<
  NextResponse | { email: string; token: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(VENDOR_SESSION_COOKIE)?.value;
  const email = await getPortalSessionEmail("vendor", token);

  if (!email || !token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return { email, token };
}
