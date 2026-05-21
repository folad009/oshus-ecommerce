"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function PasswordField({
  id,
  label,
  required = false,
  showForgot = false,
}: {
  id: string;
  label: string;
  required?: boolean;
  showForgot?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-coral"> *</span>}
        </label>
        {showForgot && (
          <Link
            href="#"
            className="text-xs text-forest underline hover:text-forest-dark"
          >
            Forgot Password?
          </Link>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          placeholder="Enter Password"
          className="h-11 rounded-lg pr-10"
          required={required}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

export function PasswordManagerForm() {
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdated(true);
  };

  if (updated) {
    return (
      <p className="text-sm text-forest font-medium">
        Your password has been updated successfully.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      <PasswordField
        id="current-password"
        label="Password"
        required
        showForgot
      />
      <PasswordField id="new-password" label="New Password" />
      <PasswordField id="confirm-password" label="Confirm New Password" />
      <Button
        type="submit"
        className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold w-fit"
      >
        Update Password
      </Button>
    </form>
  );
}
