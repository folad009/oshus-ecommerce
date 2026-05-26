import { Role } from "@prisma/client";

export type PortalRole = "admin" | "vendor" | "support" | "customer";

export function portalToRole(portal: PortalRole): Role {
  const map: Record<PortalRole, Role> = {
    admin: Role.ADMIN,
    vendor: Role.VENDOR,
    support: Role.SUPPORT,
    customer: Role.CUSTOMER,
  };
  return map[portal];
}

export function roleToPortal(role: Role): PortalRole | null {
  const map: Partial<Record<Role, PortalRole>> = {
    [Role.ADMIN]: "admin",
    [Role.VENDOR]: "vendor",
    [Role.SUPPORT]: "support",
    [Role.CUSTOMER]: "customer",
  };
  return map[role] ?? null;
}
