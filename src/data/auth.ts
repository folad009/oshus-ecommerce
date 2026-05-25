export type AuthPortal = "customer" | "vendor" | "admin" | "support";

export type StaffPortal = Exclude<AuthPortal, "customer">;

export const authRedirects: Record<AuthPortal, string> = {
  customer: "/account",
  vendor: "/vendor",
  admin: "/admin",
  support: "/support",
};

export const loginRoutes: Record<AuthPortal, string> = {
  customer: "/login",
  vendor: "/login/vendor",
  admin: "/login/admin",
  support: "/login/support",
};

export const logoutRoutes: Record<AuthPortal, string> = {
  customer: "/logout",
  vendor: "/logout/vendor",
  admin: "/logout/admin",
  support: "/logout/support",
};

export const protectedPortals: StaffPortal[] = [
  "vendor",
  "admin",
  "support",
];

export const portalPathPrefixes: Record<StaffPortal, string> = {
  vendor: "/vendor",
  admin: "/admin",
  support: "/support",
};

export function isProtectedPortal(
  portal: AuthPortal
): portal is StaffPortal {
  return portal !== "customer";
}

export function getSafePortalRedirect(
  portal: StaffPortal,
  path: string | undefined
): string {
  const prefix = portalPathPrefixes[portal];
  return path?.startsWith(prefix) ? path : prefix;
}

export interface PortalLoginHint {
  email: string;
  passwordNote: string;
}

export const portalLoginHints: Record<StaffPortal, PortalLoginHint> = {
  vendor: {
    email: "chioma@glowbeauty.ng",
    passwordNote: "Use the password set by your admin (demo: password123)",
  },
  admin: {
    email: "admin@oshusstore.com",
    passwordNote: "Use any password with at least 6 characters",
  },
  support: {
    email: "amara@oshusstore.com",
    passwordNote: "Use the password set by your admin (demo: password123)",
  },
};

export const portalLoginCopy: Record<
  StaffPortal,
  { title: string; description: string; submitClass: string; linkClass: string }
> = {
  vendor: {
    title: "Vendor Login",
    description:
      "Sign in with credentials provided by your admin. Vendor accounts are not self-registered.",
    submitClass:
      "w-full bg-navy-light hover:bg-navy text-white rounded-lg h-11 text-sm font-semibold",
    linkClass: "text-navy-light font-medium underline hover:text-navy",
  },
  admin: {
    title: "Admin Login",
    description:
      "Sign in to manage the store, products, orders, and settings.",
    submitClass:
      "w-full bg-brand hover:bg-brand-dark text-white rounded-lg h-11 text-sm font-semibold",
    linkClass: "text-brand font-medium underline hover:text-brand-dark",
  },
  support: {
    title: "Support Login",
    description:
      "Sign in to handle tickets, assist customers, and track orders.",
    submitClass:
      "w-full bg-navy hover:bg-navy-light text-white rounded-lg h-11 text-sm font-semibold",
    linkClass: "text-navy font-medium underline hover:text-navy-light",
  },
};
