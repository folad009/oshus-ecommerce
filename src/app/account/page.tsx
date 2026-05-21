import type { Metadata } from "next";
import { AccountPageHeader } from "@/components/account/AccountPageHeader";
import { AccountPageContent } from "@/components/account/AccountPageContent";
import { AccountFeaturesBar } from "@/components/account/AccountFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Account | Oshus Store",
  description: "Manage your account settings, orders, and password.",
};

export default function AccountPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AccountPageHeader />
        <AccountPageContent />
        <AccountFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
