import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SiteHeaderWrapper } from "@/components/SiteHeaderWrapper";
import { CartProvider } from "@/store/cart-provider";
import { CurrencyProvider } from "@/store/currency-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oshus Store - Your Premium Online Store",
  description:
    "Discover premium products at unbeatable prices. Fresh groceries, wellness essentials, and everyday needs delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <CurrencyProvider>
          <CartProvider>
            <SiteHeaderWrapper />
            {children}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
