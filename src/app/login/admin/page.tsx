import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthSplitPanel } from "@/components/auth/AuthSplitPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { StaffPortalLinks } from "@/components/auth/StaffPortalLinks";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";
import { getSafePortalRedirect } from "@/data/auth";

export const metadata: Metadata = {
  title: "Admin Login | Oshus Store",
  description: "Sign in to the Oshus Store admin panel.",
};

interface AdminLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const postLoginRedirect = getSafePortalRedirect(
    "admin",
    params.redirect
  );

  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Admin Login" breadcrumb="Admin Login" />
        <AuthSplitPanel
          variant="admin"
          heading="Admin Panel"
          description="Sign in to manage products, orders, customers, and store settings."
        >
          <StaffPortalLinks activePortal="admin" />
          <LoginForm portal="admin" postLoginRedirect={postLoginRedirect} />
        </AuthSplitPanel>
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
