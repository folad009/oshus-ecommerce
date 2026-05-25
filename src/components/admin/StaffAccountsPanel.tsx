"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { StaffAccountPublic, StaffRole } from "@/data/staff-accounts";

type StaffTab = "vendor" | "support";

export function StaffAccountsPanel() {
  const [accounts, setAccounts] = useState<StaffAccountPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<StaffTab>("vendor");
  const [role, setRole] = useState<StaffRole>("vendor");

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/staff");
      const data = (await res.json()) as {
        accounts?: StaffAccountPublic[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Failed to load staff accounts.");
        return;
      }

      setAccounts(data.accounts ?? []);
    } catch {
      setError("Failed to load staff accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const storeName = form.get("storeName") as string;

    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          storeName: role === "vendor" ? storeName : undefined,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to create account.");
        return;
      }

      setSuccess(
        `${role === "vendor" ? "Vendor" : "Support"} account created. Share the login credentials with them.`
      );
      e.currentTarget.reset();
      await loadAccounts();
    } catch {
      setError("Failed to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = accounts.filter((account) => account.role === tab);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-border shadow-sm p-5 md:p-6">
        <h2 className="text-base font-bold text-foreground mb-1">
          Create staff account
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Only admins can create vendor and support logins. Vendors cannot
          self-register.
        </p>

        {error && (
          <p className="text-sm text-coral mb-4" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-forest mb-4" role="status">
            {success}
          </p>
        )}

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(["vendor", "support"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
                  role === option
                    ? "bg-coral text-white border-coral"
                    : "bg-white text-foreground border-border hover:bg-light-gray"
                }`}
              >
                {option === "vendor" ? "Vendor" : "Support"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="staff-name"
                className="text-sm font-medium text-foreground mb-1.5 block"
              >
                Full name <span className="text-coral">*</span>
              </label>
              <Input
                id="staff-name"
                name="name"
                required
                placeholder="Jane Doe"
                className="h-11 rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="staff-email"
                className="text-sm font-medium text-foreground mb-1.5 block"
              >
                Email <span className="text-coral">*</span>
              </label>
              <Input
                id="staff-email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="h-11 rounded-lg"
              />
            </div>
            {role === "vendor" && (
              <div>
                <label
                  htmlFor="staff-store"
                  className="text-sm font-medium text-foreground mb-1.5 block"
                >
                  Store name <span className="text-coral">*</span>
                </label>
                <Input
                  id="staff-store"
                  name="storeName"
                  required
                  placeholder="Glow Beauty Co."
                  className="h-11 rounded-lg"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="staff-password"
                className="text-sm font-medium text-foreground mb-1.5 block"
              >
                Password <span className="text-coral">*</span>
              </label>
              <Input
                id="staff-password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto bg-coral hover:bg-coral-dark text-white rounded-lg h-11 text-sm font-semibold px-8"
          >
            {submitting ? "Creating..." : `Create ${role} account`}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground">
              Staff accounts
            </h2>
            <p className="text-sm text-muted-foreground">
              Vendors and support agents with portal access
            </p>
          </div>
          <div className="flex gap-2">
            {(["vendor", "support"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTab(option)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
                  tab === option
                    ? "bg-coral text-white border-coral"
                    : "bg-white text-muted-foreground border-border hover:bg-light-gray"
                }`}
              >
                {option === "vendor" ? "Vendors" : "Support"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-light-gray text-left">
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Name
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Email
                </th>
                {tab === "vendor" && (
                  <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                    Store
                  </th>
                )}
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Status
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={tab === "vendor" ? 5 : 4}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    Loading accounts...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={tab === "vendor" ? 5 : 4}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    No {tab} accounts yet.
                  </td>
                </tr>
              ) : (
                filtered.map((account) => (
                  <tr
                    key={account.id}
                    className="border-t border-border hover:bg-light-gray/50 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                      {account.name}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {account.email}
                    </td>
                    {tab === "vendor" && (
                      <td className="px-5 py-3.5 text-sm text-foreground">
                        {account.storeName ?? "—"}
                      </td>
                    )}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          account.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {account.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
