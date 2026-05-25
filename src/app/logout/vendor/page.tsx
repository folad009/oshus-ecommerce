import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { LogoutContent } from "@/components/auth/LogoutContent";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Vendor Logout | Oshus Store",
  description: "Sign out of your vendor portal.",
};

export default function VendorLogoutPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Logout" breadcrumb="Vendor Logout" />
        <LogoutContent
          portal="vendor"
          cancelHref="/vendor"
          description="Are you sure you want to log out of the vendor portal? You will need to sign in again to manage your store."
        />
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
