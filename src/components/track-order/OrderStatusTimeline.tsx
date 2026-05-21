import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackedOrder } from "@/data/track-order";

export function OrderStatusTimeline() {
  const { orderId, steps } = trackedOrder;
  const lastCompletedIndex = steps.reduce(
    (last, step, index) => (step.status === "completed" ? index : last),
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-base font-bold text-foreground">Order Status</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Order ID : {orderId}
        </p>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="relative min-w-[700px] pt-2">
          <div className="absolute top-[30px] left-[10%] right-[10%] h-1 flex">
            {steps.slice(0, -1).map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex-1 h-full",
                  index < lastCompletedIndex ? "bg-forest" : "bg-mid-gray"
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.status === "completed";

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={cn(
                      "relative z-10 size-14 rounded-full flex items-center justify-center mb-4 border-2 bg-white",
                      isCompleted
                        ? "border-forest text-forest"
                        : "border-mid-gray text-muted-foreground"
                    )}
                  >
                    <Icon className="size-6" />
                  </div>

                  <div
                    className={cn(
                      "size-5 rounded-full flex items-center justify-center mb-2",
                      isCompleted
                        ? "bg-forest text-white"
                        : "bg-mid-gray text-white"
                    )}
                  >
                    <Check className="size-3 stroke-[3]" />
                  </div>

                  <p className="text-xs font-semibold text-foreground mb-1">
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-snug max-w-[120px]">
                    {step.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
