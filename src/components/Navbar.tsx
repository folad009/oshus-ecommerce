"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/data/navigation";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-9 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-navy font-bold text-xl hidden sm:block">
              Oshus<span className="text-coral">Store</span>
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-coral"
                    : "text-navy hover:text-coral"
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
            <Button variant="ghost" size="icon" className="hidden sm:flex text-navy hover:text-coral">
              <Heart />
            </Button>
            <Link
              href="/cart"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative text-navy hover:text-coral"
              )}
            >
              <ShoppingCart />
              <span className="absolute -top-0.5 -right-0.5 bg-coral text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link
              href="/account"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                pathname === "/account" ? "text-coral" : "text-navy hover:text-coral"
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
                  className="text-sm font-medium text-navy hover:text-coral px-2 py-2 rounded-md hover:bg-light-gray transition-colors"
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
