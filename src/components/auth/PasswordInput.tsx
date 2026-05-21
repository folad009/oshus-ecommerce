"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  id: string;
  name?: string;
  label: string;
  required?: boolean;
  showForgot?: boolean;
  placeholder?: string;
}

export function PasswordInput({
  id,
  name,
  label,
  required = false,
  showForgot = false,
  placeholder = "Enter Password",
}: PasswordInputProps) {
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
            href="/login"
            className="text-xs text-forest underline hover:text-forest-dark"
          >
            Forgot Password?
          </Link>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          name={name ?? id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
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
