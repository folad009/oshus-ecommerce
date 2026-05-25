"use client";

import { useState } from "react";
import { VendorSidebar } from "@/components/vendor/VendorSidebar";
import { VendorTopBar } from "@/components/vendor/VendorTopBar";

interface VendorShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function VendorShell({ title, subtitle, children }: VendorShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-light-gray">
      <VendorSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <VendorTopBar
          title={title}
          subtitle={subtitle}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
