import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminStat } from "@/data/admin";

export function StatCard({ stat }: { stat: AdminStat }) {
  const TrendIcon =
    stat.trend === "up"
      ? TrendingUp
      : stat.trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
      <p className="text-2xl font-bold text-foreground mb-2">{stat.value}</p>
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-medium",
          stat.trend === "up" && "text-green-600",
          stat.trend === "down" && "text-red-600",
          stat.trend === "neutral" && "text-muted-foreground"
        )}
      >
        <TrendIcon className="size-3.5" />
        {stat.change}
      </div>
    </div>
  );
}
