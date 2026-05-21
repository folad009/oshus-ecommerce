import { Check } from "lucide-react";

export function OrderSuccessSection() {
  return (
    <section className="py-10 md:py-12 text-center">
      <div className="max-w-xl mx-auto px-4">
        <div className="size-20 md:size-24 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
          <Check className="size-10 md:size-12 text-white stroke-[3]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Your order is completed!
        </h2>
        <p className="text-sm text-muted-foreground">
          Thank you. Your Order has been received.
        </p>
      </div>
    </section>
  );
}
