import type { ActivityEntry } from "@/data/admin-track-order";

interface ActivityLogProps {
  entries: ActivityEntry[];
}

export function ActivityLog({ entries }: ActivityLogProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Activity Log</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Internal audit trail for this order
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Time
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Actor
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t border-border">
                <td className="px-5 py-3 text-sm text-muted-foreground whitespace-nowrap">
                  {entry.time}
                </td>
                <td className="px-5 py-3 text-sm font-medium text-foreground">
                  {entry.actor}
                </td>
                <td className="px-5 py-3 text-sm text-foreground">
                  {entry.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
