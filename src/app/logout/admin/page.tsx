import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { LogoutContent } from "@/components/auth/LogoutContent";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Admin Logout | Oshus Store",
  description: "Sign out of the admin panel.",
};

export default function AdminLogoutPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Logout" breadcrumb="Admin Logout" />
        <LogoutContent
          portal="admin"
          cancelHref="/admin"
          description="Are you sure you want to log out of the admin panel? You will need to sign in again to continue."
        />
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
