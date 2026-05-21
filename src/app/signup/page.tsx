import type { Metadata } from "next";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthSplitPanel } from "@/components/auth/AuthSplitPanel";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthFeaturesBar } from "@/components/auth/AuthFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sign Up | Oshus Store",
  description: "Create your Oshus Store account and get exclusive offers.",
};

export default function SignupPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <AuthPageHeader title="Sign Up" breadcrumb="Sign Up" />
        <AuthSplitPanel
          heading="Join Oshus Store"
          description="Create an account today and unlock member-only deals, order tracking, and secure Paystack payments."
        >
          <SignupForm />
        </AuthSplitPanel>
        <AuthFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
