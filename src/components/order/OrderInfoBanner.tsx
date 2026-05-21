import { Button } from "@/components/ui/button";
import { completedOrder } from "@/data/order-completed";

export function OrderInfoBanner() {
  const { orderId, paymentMethod, transactionId, deliveryDate } = completedOrder;

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-2 mb-8">
      <div className="bg-forest rounded-2xl px-5 py-5 md:px-8 md:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          <div>
            <p className="text-xs text-white/70 mb-1">Order ID</p>
            <p className="text-sm font-semibold text-white">{orderId}</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Payment Method</p>
            <p className="text-sm font-semibold text-white">{paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Transaction ID</p>
            <p className="text-sm font-semibold text-white">{transactionId}</p>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Estimated Delivery Date</p>
            <p className="text-sm font-semibold text-white">{deliveryDate}</p>
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
