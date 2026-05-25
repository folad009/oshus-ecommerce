import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { vendorPayouts } from "@/data/vendor";

export function VendorEarningsPanel() {
  const pendingTotal = vendorPayouts
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const completedTotal = vendorPayouts
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Available balance</p>
          <p className="text-2xl font-bold text-foreground">
            {formatNaira(pendingTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Next payout 22 Apr</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total paid out</p>
          <p className="text-2xl font-bold text-foreground">
            {formatNaira(completedTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Via Paystack</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Payout History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            10% commission deducted per order
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="bg-light-gray text-left">
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Reference
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Date
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Amount
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {vendorPayouts.map((payout) => (
                <tr key={payout.id} className="border-t border-border">
                  <td className="px-5 py-3.5 text-sm font-medium text-navy-light">
                    {payout.id}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {payout.date}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {formatNaira(payout.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
                        payout.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      )}
                    >
                      {payout.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
