"use client";

import { useState } from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AccountPanelContent } from "@/components/account/AccountPanelContent";
import type { AccountMenuId } from "@/data/account";

export function AccountPageContent() {
  const [activeId, setActiveId] = useState<AccountMenuId>("password");

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
          <AccountSidebar activeId={activeId} onSelect={setActiveId} />
          <div className="min-w-0">
            <AccountPanelContent activeId={activeId} />
          </div>
        </div>
      </div>
    </section>
  );
}
