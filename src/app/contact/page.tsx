import type { Metadata } from "next";
import { ContactPageHeader } from "@/components/contact/ContactPageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactFeaturesBar } from "@/components/contact/ContactFeaturesBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Oshus Store",
  description: "Get in touch with Oshus Store. We're here to help.",
};

export default function ContactPage() {
  return (
    <>
      <main className="flex-1 bg-white">
        <ContactPageHeader />
        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <ContactForm />
              <ContactInfoCard />
            </div>
          </div>
        </section>
        <ContactMap />
        <ContactFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
