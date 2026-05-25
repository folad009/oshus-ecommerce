import { VendorShell } from "@/components/vendor/VendorShell";
import { VendorStatCard } from "@/components/vendor/VendorStatCard";
import { VendorOrdersTable } from "@/components/vendor/VendorOrdersTable";
import {
  vendorStats,
  vendorOrders,
  vendorProducts,
  vendorOrderStatusStyles,
} from "@/data/vendor";

export default function VendorDashboardPage() {
  const pendingCount = vendorOrders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  ).length;
  const lowStockCount = vendorProducts.filter((p) => p.stock < 15).length;

  return (
    <VendorShell
      title="Dashboard"
      subtitle="Overview of your store on Oshus"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {vendorStats.map((stat) => (
            <VendorStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">
              Order Status
            </h2>
            <div className="flex flex-col gap-3">
              {(
                Object.keys(vendorOrderStatusStyles) as Array<
                  keyof typeof vendorOrderStatusStyles
                >
              ).map((status) => {
                const count = vendorOrders.filter(
                  (o) => o.status === status
                ).length;
                const style = vendorOrderStatusStyles[status];
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
                      {count} orders
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
                href="/vendor/products"
                className="text-sm text-center bg-navy-light hover:bg-navy text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Manage Products
              </a>
              <a
                href="/vendor/orders"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                View Orders
              </a>
              <a
                href="/vendor/track-order"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                Track Order
              </a>
              <a
                href="/vendor/earnings"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                View Earnings
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {pendingCount} orders in progress
              {lowStockCount > 0 && ` · ${lowStockCount} low stock items`}
            </p>
          </div>
        </div>

        <VendorOrdersTable orders={vendorOrders.slice(0, 4)} showViewAll />
      </div>
    </VendorShell>
  );
}
