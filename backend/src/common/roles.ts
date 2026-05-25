import { Role } from "@prisma/client";

export type PortalRole = "admin" | "vendor" | "support";

export function portalToRole(portal: PortalRole): Role {
  const map: Record<PortalRole, Role> = {
    admin: Role.ADMIN,
    vendor: Role.VENDOR,
    support: Role.SUPPORT,
  };
  return map[portal];
}

export function roleToPortal(role: Role): PortalRole | null {
  const map: Partial<Record<Role, PortalRole>> = {
    [Role.ADMIN]: "admin",
    [Role.VENDOR]: "vendor",
    [Role.SUPPORT]: "support",
  };
  return map[role] ?? null;
}
