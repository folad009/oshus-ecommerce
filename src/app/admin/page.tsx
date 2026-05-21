import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/admin/StatCard";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { adminStats, adminOrders } from "@/data/admin";
import { statusStyles } from "@/data/admin";

export default function AdminDashboardPage() {
  const pendingCount = adminOrders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  ).length;

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of your store performance"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {adminStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">
              Order Status Overview
            </h2>
            <div className="flex flex-col gap-3">
              {(
                Object.keys(statusStyles) as Array<keyof typeof statusStyles>
              ).map((status) => {
                const count = adminOrders.filter(
                  (o) => o.status === status
                ).length;
                const style = statusStyles[status];
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
                href="/admin/products"
                className="text-sm text-center bg-forest hover:bg-forest-dark text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Manage Products
              </a>
              <a
                href="/admin/orders"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                View Orders
              </a>
              <a
                href="/admin/track-order"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                Track Order
              </a>
              <a
                href="/"
                className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
              >
                View Storefront
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {pendingCount} orders need attention
            </p>
          </div>
        </div>

        <OrdersTable orders={adminOrders.slice(0, 5)} showViewAll />
      </div>
    </AdminShell>
  );
}
