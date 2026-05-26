"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { AuthDivider } from "@/components/auth/AuthDivider";
import type { AuthPortal } from "@/data/auth";
import {
  authRedirects,
  getSafePortalRedirect,
  isProtectedPortal,
  portalLoginCopy,
  portalLoginHints,
} from "@/data/auth";

interface LoginFormProps {
  portal?: AuthPortal;
  postLoginRedirect?: string;
}

export function LoginForm({
  portal = "customer",
  postLoginRedirect,
}: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectTo = authRedirects[portal];
  const isStaff = isProtectedPortal(portal);
  const copy = isStaff ? portalLoginCopy[portal] : null;
  const hint = isStaff ? portalLoginHints[portal] : null;
  const showGoogleAuth = portal === "customer";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${portal}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as {
        error?: string;
        redirectTo?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      const destination = isStaff
        ? getSafePortalRedirect(
            portal,
            postLoginRedirect ?? data.redirectTo
          )
        : (postLoginRedirect ?? data.redirectTo ?? redirectTo);
      router.push(destination);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">
        {copy?.title ?? "Login"}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {copy?.description ??
          "Welcome back! Sign in to access your account."}
      </p>

      {hint && (
        <p className="text-xs text-muted-foreground mb-4 rounded-lg bg-light-gray px-3 py-2">
          Demo: {hint.email} — {hint.passwordNote}
        </p>
      )}

      {error && (
        <p className="text-sm text-coral mb-4" role="alert">
          {error}
        </p>
      )}

      {showGoogleAuth && (
        <>
          <GoogleAuthButton
            mode="login"
            redirectTo={redirectTo}
            portal={portal}
            postLoginRedirect={postLoginRedirect}
          />
          <AuthDivider />
        </>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="login-email"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Email <span className="text-coral">*</span>
          </label>
          <Input
            id="login-email"
            name="email"
            type="email"
            required
            defaultValue={hint?.email}
            placeholder={hint?.email ?? "example@gmail.com"}
            className="h-11 rounded-lg"
          />
        </div>

        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          required
          showForgot={portal === "customer"}
        />

        <Button
          type="submit"
          disabled={loading}
          className={
            copy?.submitClass ??
            "w-full bg-brand hover:bg-brand-dark text-white rounded-lg h-11 text-sm font-semibold"
          }
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      {portal === "customer" && (
        <p className="text-sm text-muted-foreground mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-brand font-medium underline hover:text-brand-dark"
          >
            Sign up now
          </Link>
        </p>
      )}

      {isStaff && (
        <p className="text-sm text-muted-foreground mt-6 text-center">
          Shopping as a customer?{" "}
          <Link
            href="/login"
            className={
              copy?.linkClass ??
              "text-forest font-medium underline hover:text-forest-dark"
            }
          >
            Customer login
          </Link>
        </p>
      )}
    </div>
  );
}
