import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { LogoutContent } from "@/components/auth/LogoutContent";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support Logout | Oshus Store",
  description: "Sign out of the support portal.",
};

export default function SupportLogoutPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Logout" breadcrumb="Support Logout" />
        <LogoutContent
          portal="support"
          cancelHref="/support"
          description="Are you sure you want to log out of the support portal? You will need to sign in again to continue."
        />
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
