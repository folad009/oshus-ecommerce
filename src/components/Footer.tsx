import Link from "next/link";
import { Globe, MessageCircle, Send, Play, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-9 bg-coral rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl">
                Oshus<span className="text-coral">Store</span>
              </span>
            </div>
            <p className="text-white/60 text-sm mb-4 max-w-xs">
              Your trusted online store for premium products, delivered fresh to
              your doorstep.
            </p>
            <div className="flex gap-2">
              {[Globe, MessageCircle, Send, Play].map((Icon, i) => (
                <button
                  key={i}
                  className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Categories", href: "/categories" },
                { label: "Deals", href: "/deals" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-sm mb-4">Customer Service</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "My Account", href: "/account" },
                { label: "FAQ", href: "#" },
                { label: "Track Your Order", href: "/track-order" },
                { label: "Shipping & Delivery", href: "#" },
                { label: "Returns & Exchanges", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms & Conditions", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm mb-4">Newsletter</h4>
            <p className="text-white/60 text-sm mb-3">
              Subscribe for exclusive deals and updates.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-white/10 border-0 text-white placeholder:text-white/40 rounded-lg h-9 text-sm flex-1"
              />
              <Button className="bg-coral hover:bg-coral-dark text-white rounded-lg h-9 px-4 text-sm font-semibold shrink-0">
                Join
              </Button>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <MapPin className="size-3 shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Phone className="size-3 shrink-0" />
                <span>+234 800 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Mail className="size-3 shrink-0" />
                <span>hello@oshusstore.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-white/40 text-xs">
          <span>&copy; 2026 Oshus Store. All rights reserved.</span>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Paystack</span>
            <span>Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
