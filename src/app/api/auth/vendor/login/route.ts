import { NextResponse } from "next/server";
import { authRedirects } from "@/data/auth";
import { loginPortal } from "@/lib/portal-login";
import {
  getVendorSessionCookieOptions,
  VENDOR_SESSION_COOKIE,
} from "@/lib/vendor-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  const result = await loginPortal("vendor", email, password);

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status ?? 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    redirectTo: authRedirects.vendor,
  });

  response.cookies.set(
    VENDOR_SESSION_COOKIE,
    result.accessToken,
    getVendorSessionCookieOptions()
  );

  return response;
}
