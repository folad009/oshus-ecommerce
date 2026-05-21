import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CartNewsletter() {
  return (
    <section className="relative bg-cart-green-bg py-14 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a8c5a8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm font-medium text-forest mb-2 block">
          Our Newsletter
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-forest font-semibold mb-3 leading-snug">
          Subscribe to Our Newsletter to Get Updates on Our Latest Offers
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
          Sign up for our newsletter and receive 25% off your first order. Stay
          updated with new arrivals and exclusive deals.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter Email Address"
            className="rounded-xl h-12 bg-white border-border flex-1"
          />
          <Button
            type="submit"
            className="bg-cart-yellow hover:bg-cart-yellow/90 text-foreground rounded-xl h-12 px-8 text-sm font-semibold shrink-0"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
