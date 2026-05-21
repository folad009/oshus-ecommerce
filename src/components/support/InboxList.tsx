"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { supportTickets } from "@/data/support";

const inboxMessages = supportTickets.map((ticket) => ({
  id: ticket.id,
  from: ticket.customer,
  email: ticket.email,
  preview: ticket.subject,
  time: ticket.createdAt.split(",")[1]?.trim() ?? ticket.createdAt,
  unread: ticket.status === "open" || ticket.status === "in_progress",
}));

export function InboxList() {
  const [selectedId, setSelectedId] = useState(inboxMessages[0]?.id ?? "");

  const selected = inboxMessages.find((m) => m.id === selectedId);

  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-[480px]">
      <div className="lg:w-[320px] shrink-0 bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Messages</h2>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {inboxMessages.map((msg) => (
            <li key={msg.id}>
              <button
                type="button"
                onClick={() => setSelectedId(msg.id)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border transition-colors",
                  selectedId === msg.id
                    ? "bg-forest/5 border-l-2 border-l-forest"
                    : "hover:bg-light-gray/50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={cn(
                      "text-sm truncate",
                      msg.unread ? "font-bold text-foreground" : "font-medium text-foreground"
                    )}
                  >
                    {msg.from}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {msg.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {msg.preview}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-border shadow-sm flex flex-col">
        {selected ? (
          <>
            <div className="px-5 py-4 border-b border-border">
              <p className="text-sm font-bold text-foreground">{selected.from}</p>
              <p className="text-xs text-muted-foreground">{selected.email}</p>
            </div>
            <div className="flex-1 p-5">
              <p className="text-sm font-semibold text-foreground mb-2">
                {selected.preview}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hi, I need help with my recent order. Could you please look into
                this and get back to me as soon as possible? Thank you.
              </p>
            </div>
            <div className="p-4 border-t border-border flex gap-2">
              <textarea
                placeholder="Type your reply..."
                rows={2}
                className="flex-1 resize-none rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
              <button
                type="button"
                className="shrink-0 self-end bg-forest hover:bg-forest-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="p-5 text-sm text-muted-foreground">Select a message</p>
        )}
      </div>
    </div>
  );
}
