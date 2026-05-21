"use client";

import { useState } from "react";
import { SupportSidebar } from "@/components/support/SupportSidebar";
import { SupportTopBar } from "@/components/support/SupportTopBar";

interface SupportShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SupportShell({ title, subtitle, children }: SupportShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-light-gray">
      <SupportSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <SupportTopBar
          title={title}
          subtitle={subtitle}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
