import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthSplitPanel } from "@/components/auth/AuthSplitPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { StaffPortalLinks } from "@/components/auth/StaffPortalLinks";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";
import { getSafePortalRedirect } from "@/data/auth";

export const metadata: Metadata = {
  title: "Vendor Login | Oshus Store",
  description: "Sign in to your Oshus Store vendor portal.",
};

interface VendorLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function VendorLoginPage({
  searchParams,
}: VendorLoginPageProps) {
  const params = await searchParams;
  const postLoginRedirect = getSafePortalRedirect(
    "vendor",
    params.redirect
  );

  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Vendor Login" breadcrumb="Vendor Login" />
        <AuthSplitPanel
          variant="vendor"
          heading="Vendor Portal"
          description="Sign in with admin-provided credentials to manage your products, orders, and earnings."
        >
          <StaffPortalLinks activePortal="vendor" />
          <LoginForm portal="vendor" postLoginRedirect={postLoginRedirect} />
        </AuthSplitPanel>
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
