import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { LogoutContent } from "@/components/auth/LogoutContent";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Logout | Oshus Store",
  description: "Sign out of your Oshus Store account.",
};

export default function LogoutPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Logout" breadcrumb="Logout" />
        <LogoutContent />
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
