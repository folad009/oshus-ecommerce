"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { AuthDivider } from "@/components/auth/AuthDivider";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirmPassword") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.get("terms")) {
      setError("Please accept the terms and conditions.");
      return;
    }

    router.push("/account");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">Sign Up</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Create an account and get 20% off your first order.
      </p>

      {error && (
        <p className="text-sm text-coral mb-4" role="alert">
          {error}
        </p>
      )}

      <GoogleAuthButton mode="signup" />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="signup-name"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Your Name <span className="text-coral">*</span>
          </label>
          <Input
            id="signup-name"
            name="name"
            required
            placeholder="Ex. John Doe"
            className="h-11 rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            Email <span className="text-coral">*</span>
          </label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            required
            placeholder="example@gmail.com"
            className="h-11 rounded-lg"
          />
        </div>

        <PasswordInput
          id="signup-password"
          name="password"
          label="Password"
          required
        />

        <PasswordInput
          id="signup-confirm"
          name="confirmPassword"
          label="Confirm Password"
          required
        />

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            className="size-4 rounded accent-forest mt-0.5 shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <Link href="#" className="text-forest underline">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-forest underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold"
        >
          Sign Up
        </Button>
      </form>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-forest font-medium underline hover:text-forest-dark"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
