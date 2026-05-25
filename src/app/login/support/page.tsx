import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthSplitPanel } from "@/components/auth/AuthSplitPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { StaffPortalLinks } from "@/components/auth/StaffPortalLinks";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";
import { getSafePortalRedirect } from "@/data/auth";

export const metadata: Metadata = {
  title: "Support Login | Oshus Store",
  description: "Sign in to the Oshus Store support portal.",
};

interface SupportLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function SupportLoginPage({
  searchParams,
}: SupportLoginPageProps) {
  const params = await searchParams;
  const postLoginRedirect = getSafePortalRedirect(
    "support",
    params.redirect
  );

  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Support Login" breadcrumb="Support Login" />
        <AuthSplitPanel
          variant="support"
          heading="Support Portal"
          description="Sign in to handle tickets, assist customers, and track orders."
        >
          <StaffPortalLinks activePortal="support" />
          <LoginForm portal="support" postLoginRedirect={postLoginRedirect} />
        </AuthSplitPanel>
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
