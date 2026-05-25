import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthSplitPanel } from "@/components/auth/AuthSplitPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthPortalLinks } from "@/components/auth/AuthPortalLinks";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Login | Oshus Store",
  description: "Sign in to your Oshus Store account.",
};

export default function LoginPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Login" breadcrumb="Login" />
        <AuthSplitPanel
          heading="Welcome Back"
          description="Sign in to manage your orders, track deliveries, and enjoy a faster checkout experience."
        >
          <AuthPortalLinks activePortal="customer" />
          <LoginForm portal="customer" />
        </AuthSplitPanel>
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
