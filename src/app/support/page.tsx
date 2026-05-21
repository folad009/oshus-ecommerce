import { SupportShell } from "@/components/support/SupportShell";
import { SupportStatCard } from "@/components/support/SupportStatCard";
import { TicketsTable } from "@/components/support/TicketsTable";
import {
  supportStats,
  supportTickets,
  ticketStatusStyles,
} from "@/data/support";

export default function SupportDashboardPage() {
  const openCount = supportTickets.filter(
    (t) => t.status === "open" || t.status === "in_progress"
  ).length;
  const highPriorityCount = supportTickets.filter(
    (t) => t.priority === "high" && t.status !== "closed" && t.status !== "resolved"
  ).length;

  return (
    <SupportShell
      title="Dashboard"
      subtitle="Manage customer support and inquiries"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {supportStats.map((stat) => (
            <SupportStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">
              Ticket Status Overview
            </h2>
            <div className="flex flex-col gap-3">
              {(
                Object.keys(ticketStatusStyles) as Array<
                  keyof typeof ticketStatusStyles
                >
              ).map((status) => {
                const count = supportTickets.filter(
                  (t) => t.status === status
                ).length;
                const style = ticketStatusStyles[status];
                return (
                  <div
                    key={status}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${style.className}`}
                    >
                      {style.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {count} tickets
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href="/support/tickets"
                className="text-sm text-center bg-forest hover:bg-forest-dark text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                View Tickets
              </a>
              <a
                href="/support/orders"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                Lookup Orders
              </a>
              <a
                href="/support/track-order"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                Track Order
              </a>
              <a
                href="/support/inbox"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                Open Inbox
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {openCount} tickets need attention · {highPriorityCount} high
              priority
            </p>
          </div>
        </div>

        <TicketsTable tickets={supportTickets.slice(0, 5)} showViewAll />
      </div>
    </SupportShell>
  );
}
