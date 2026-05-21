import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  supportTickets,
  ticketPriorityStyles,
  ticketStatusStyles,
  type SupportTicket,
} from "@/data/support";

interface TicketsTableProps {
  tickets?: SupportTicket[];
  showViewAll?: boolean;
}

export function TicketsTable({
  tickets = supportTickets,
  showViewAll = false,
}: TicketsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Support Tickets</h2>
        {showViewAll && (
          <Link
            href="/support/tickets"
            className="text-sm text-forest font-medium hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Ticket
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Customer
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Created
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Priority
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Status
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const priority = ticketPriorityStyles[ticket.priority];
              const status = ticketStatusStyles[ticket.status];
              return (
                <tr
                  key={ticket.id}
                  className="border-t border-border hover:bg-light-gray/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-forest">{ticket.id}</p>
                    <p className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {ticket.subject}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">
                      {ticket.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">{ticket.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                    {ticket.createdAt}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
                        priority.className
                      )}
                    >
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      className="text-sm text-forest font-medium hover:underline"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
