import { promises as fs } from "fs";
import path from "path";
import {
  seedStaffAccounts,
  type StaffAccount,
  type StaffRole,
} from "@/data/staff-accounts";

const STORE_PATH = path.join(
  process.cwd(),
  "data",
  "staff-accounts-store.json"
);

let cache: StaffAccount[] | null = null;

async function persistAccounts(accounts: StaffAccount[]): Promise<void> {
  cache = accounts;
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(accounts, null, 2), "utf-8");
}

export async function getStaffAccounts(): Promise<StaffAccount[]> {
  if (cache) {
    return cache;
  }

  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    cache = JSON.parse(raw) as StaffAccount[];
    return cache;
  } catch {
    cache = [...seedStaffAccounts];
    await persistAccounts(cache);
    return cache;
  }
}

export async function findStaffAccount(
  email: string,
  role: StaffRole
): Promise<StaffAccount | undefined> {
  const normalized = email.trim().toLowerCase();
  const accounts = await getStaffAccounts();
  return accounts.find(
    (account) =>
      account.email.toLowerCase() === normalized &&
      account.role === role &&
      account.status === "active"
  );
}

export async function addStaffAccount(
  input: Omit<StaffAccount, "id" | "createdAt">
): Promise<StaffAccount | { error: string }> {
  const email = input.email.trim().toLowerCase();
  const accounts = await getStaffAccounts();

  if (accounts.some((account) => account.email.toLowerCase() === email)) {
    return { error: "An account with this email already exists." };
  }

  if (input.role === "vendor" && !input.storeName?.trim()) {
    return { error: "Store name is required for vendor accounts." };
  }

  const account: StaffAccount = {
    ...input,
    email,
    id: `${input.role}-${Date.now()}`,
    storeName:
      input.role === "vendor" ? input.storeName?.trim() : undefined,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  await persistAccounts([...accounts, account]);
  return account;
}
