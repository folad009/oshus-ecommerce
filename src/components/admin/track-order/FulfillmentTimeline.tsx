import { cn } from "@/lib/utils";
import type { FulfillmentStep } from "@/data/admin-track-order";

interface FulfillmentTimelineProps {
  steps: FulfillmentStep[];
}

export function FulfillmentTimeline({ steps }: FulfillmentTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <h2 className="text-base font-bold text-foreground mb-5">
        Fulfillment Timeline
      </h2>
      <ol className="relative border-l-2 border-mid-gray ml-3 space-y-6">
        {steps.map((step) => (
          <li key={step.id} className="ml-6 relative">
            <span
              className={cn(
                "absolute -left-[31px] top-1 size-4 rounded-full border-2 bg-white",
                step.status === "completed" && "border-navy bg-navy",
                step.status === "current" && "border-coral bg-coral",
                step.status === "pending" && "border-mid-gray bg-white"
              )}
            />
            <div
              className={cn(
                "rounded-lg p-4 border",
                step.status === "current"
                  ? "border-coral/40 bg-coral/5"
                  : "border-border bg-light-gray/30"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-foreground">
                  {step.label}
                </p>
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded",
                    step.status === "completed" && "bg-navy/10 text-navy",
                    step.status === "current" && "bg-coral/15 text-coral",
                    step.status === "pending" && "bg-mid-gray/50 text-muted-foreground"
                  )}
                >
                  {step.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{step.timestamp}</p>
              {step.note && (
                <p className="text-xs text-foreground mt-2 italic">
                  {step.note}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
