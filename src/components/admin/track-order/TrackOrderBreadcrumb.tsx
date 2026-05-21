import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface TrackOrderBreadcrumbProps {
  orderId: string;
  basePath?: string;
}

export function TrackOrderBreadcrumb({
  orderId,
  basePath = "/admin",
}: TrackOrderBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <Link
        href={`${basePath}/track-order`}
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-navy transition-colors"
      >
        <ChevronLeft className="size-4" />
        Track orders
      </Link>
      <span className="text-muted-foreground">/</span>
      <Link
        href={`${basePath}/orders`}
        className="text-muted-foreground hover:text-navy transition-colors"
      >
        Orders
      </Link>
      <span className="text-muted-foreground">/</span>
      <span className="font-semibold text-navy">{orderId}</span>
    </div>
  );
}
