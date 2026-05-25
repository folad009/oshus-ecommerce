import { NextResponse } from "next/server";
import { loginRoutes } from "@/data/auth";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    redirectTo: loginRoutes.admin,
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
