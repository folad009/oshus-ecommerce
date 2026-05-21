"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { AuthDivider } from "@/components/auth/AuthDivider";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    router.push("/account");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">Login</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Welcome back! Sign in to access your account.
      </p>

      {error && (
        <p className="text-sm text-coral mb-4" role="alert">
          {error}
        </p>
      )}

      <GoogleAuthButton mode="login" />
      <AuthDivider />

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
            placeholder="example@gmail.com"
            className="h-11 rounded-lg"
          />
        </div>

        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          required
          showForgot
        />

        <Button
          type="submit"
          className="w-full bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold"
        >
          Login
        </Button>
      </form>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-forest font-medium underline hover:text-forest-dark"
        >
          Sign up now
        </Link>
      </p>
    </div>
  );
}
