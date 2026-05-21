import { MapPin, CreditCard, Truck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "@/data/admin";
import { formatNaira } from "@/data/checkout";
import type { AdminTrackingDetail } from "@/data/admin-track-order";

interface OrderDetailPanelProps {
  order: AdminTrackingDetail;
}

export function OrderDetailPanel({ order }: OrderDetailPanelProps) {
  const status = statusStyles[order.status];

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Order ID
          </p>
          <p className="text-lg font-bold text-navy">{order.orderId}</p>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full shrink-0",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
        <div>
          <p className="text-xs text-muted-foreground">Placed</p>
          <p className="text-sm font-medium text-foreground">{order.placedAt}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-sm font-bold text-foreground">
            {formatNaira(order.total)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Items</p>
          <p className="text-sm font-medium text-foreground">{order.items}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Est. delivery</p>
          <p className="text-sm font-medium text-foreground">
            {order.estimatedDelivery}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <User className="size-4 text-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {order.customer}
            </p>
            <p className="text-xs text-muted-foreground">{order.email}</p>
            <p className="text-xs text-muted-foreground">{order.phone}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin className="size-4 text-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-0.5">
              Shipping address
            </p>
            <p className="text-sm text-foreground">{order.shippingAddress}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CreditCard className="size-4 text-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-0.5">
              Payment
            </p>
            <p className="text-sm text-foreground">{order.paymentMethod}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Truck className="size-4 text-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-0.5">
              Carrier & tracking
            </p>
            <p className="text-sm text-foreground">
              {order.carrier} · {order.trackingNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
