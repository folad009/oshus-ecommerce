import { NextResponse } from "next/server";
import { loginRoutes } from "@/data/auth";
import { VENDOR_SESSION_COOKIE } from "@/lib/vendor-auth";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    redirectTo: loginRoutes.vendor,
  });

  response.cookies.set(VENDOR_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
