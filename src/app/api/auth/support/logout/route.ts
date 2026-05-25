import { NextResponse } from "next/server";
import { loginRoutes } from "@/data/auth";
import { SUPPORT_SESSION_COOKIE } from "@/lib/support-auth";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    redirectTo: loginRoutes.support,
  });

  response.cookies.set(SUPPORT_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
