import { Button } from "@/components/ui/button";
import type { CompletedOrderSnapshot } from "@/lib/completed-order-storage";

interface OrderInfoBannerProps {
  order: CompletedOrderSnapshot;
}

function formatDeliveryDate(placedAt: string) {
  const date = new Date(placedAt);
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function OrderInfoBanner({ order }: OrderInfoBannerProps) {
  const { orderNumber, placedAt } = order;

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-2 mb-8">
      <div className="bg-forest rounded-2xl px-5 py-5 md:px-8 md:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          <div>
            <p className="text-xs text-white/70 mb-1">Order ID</p>
            <p className="text-sm font-semibold text-white">{orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Payment Method</p>
            <p className="text-sm font-semibold text-white">Paystack</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Customer Email</p>
            <p className="text-sm font-semibold text-white truncate">
              {order.customerEmail}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Estimated Delivery Date</p>
            <p className="text-sm font-semibold text-white">
              {formatDeliveryDate(placedAt)}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="bg-white text-forest border-0 hover:bg-white/90 rounded-xl h-11 px-6 text-sm font-semibold shrink-0"
        >
          Download Invoice
        </Button>
      </div>
    </section>
  );
}
