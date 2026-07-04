"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/data/navigation";
import { useCart } from "@/store/cart-provider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, hydrated } = useCart();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Logo size="md" className="hidden sm:flex" />
          <Logo size="sm" showText={false} className="sm:hidden" />

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-bold transition-colors",
                  pathname === link.href
                    ? "text-brand"
                    : "text-navy hover:text-brand"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <Input
              type="text"
              placeholder="Search products, brands..."
              className="pr-10 rounded-full bg-light-gray border-0 h-10 text-sm"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 size-8 rounded-full hover:bg-navy hover:text-white"
            >
              <Search />
            </Button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-navy hover:text-brand">
              <Heart />
            </Button>
            <Link
              href="/cart"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative text-navy hover:text-brand"
              )}
            >
              <ShoppingCart />
              {hydrated && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                pathname === "/login" ? "text-brand" : "text-navy hover:text-brand"
              )}
            >
              <User />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-navy"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {/* Mobile Search */}
              <div className="flex items-center relative mb-2 md:hidden">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pr-10 rounded-full bg-light-gray border-0 h-10 text-sm"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 size-8 rounded-full"
                >
                  <Search />
                </Button>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-navy hover:text-brand px-2 py-2 rounded-md hover:bg-light-gray transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
