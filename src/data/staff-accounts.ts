import { supportAgent } from "@/data/support";
import { vendorProfile } from "@/data/vendor";

export type StaffRole = "vendor" | "support";

export type StaffAccountStatus = "active" | "inactive";

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  password: string;
  storeName?: string;
  status: StaffAccountStatus;
  createdAt: string;
}

export type StaffAccountPublic = Omit<StaffAccount, "password">;

export const DEFAULT_STAFF_PASSWORD = "password123";

export const seedStaffAccounts: StaffAccount[] = [
  {
    id: "vendor-chioma",
    name: vendorProfile.name,
    email: vendorProfile.email,
    role: "vendor",
    password: DEFAULT_STAFF_PASSWORD,
    storeName: vendorProfile.storeName,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "support-amara",
    name: supportAgent.name,
    email: supportAgent.email,
    role: "support",
    password: DEFAULT_STAFF_PASSWORD,
    status: "active",
    createdAt: "2024-02-01",
  },
];

export function toPublicStaffAccount(
  account: StaffAccount
): StaffAccountPublic {
  const { password: _password, ...publicAccount } = account;
  return publicAccount;
}
