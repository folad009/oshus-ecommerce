import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getSafePortalRedirect,
  loginRoutes,
  portalPathPrefixes,
  type StaffPortal,
} from "@/data/auth";
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import {
  verifySupportSessionToken,
  SUPPORT_SESSION_COOKIE,
} from "@/lib/support-auth";
import {
  verifyVendorSessionToken,
  VENDOR_SESSION_COOKIE,
} from "@/lib/vendor-auth";

const protectedRoutes: StaffPortal[] = ["vendor", "admin", "support"];

const sessionChecks: Record<
  StaffPortal,
  { cookie: string; verify: (token: string | undefined) => Promise<boolean> }
> = {
  vendor: { cookie: VENDOR_SESSION_COOKIE, verify: verifyVendorSessionToken },
  admin: { cookie: ADMIN_SESSION_COOKIE, verify: verifyAdminSessionToken },
  support: { cookie: SUPPORT_SESSION_COOKIE, verify: verifySupportSessionToken },
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const portal of protectedRoutes) {
    const prefix = portalPathPrefixes[portal];
    const loginPath = loginRoutes[portal];
    const { cookie, verify } = sessionChecks[portal];
    const isAuthenticated = await verify(
      request.cookies.get(cookie)?.value
    );

    if (pathname.startsWith(prefix)) {
      if (!isAuthenticated) {
        const loginUrl = new URL(loginPath, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    if (pathname === loginPath && isAuthenticated) {
      const redirect = getSafePortalRedirect(
        portal,
        request.nextUrl.searchParams.get("redirect") ?? undefined
      );
      return NextResponse.redirect(new URL(redirect, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/vendor/:path*",
    "/admin",
    "/admin/:path*",
    "/support/:path*",
    "/login/vendor",
    "/login/admin",
    "/login/support",
  ],
};
