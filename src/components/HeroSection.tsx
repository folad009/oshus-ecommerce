import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  productImages?: string[];
}

export function HeroSection({ productImages = [] }: HeroSectionProps) {
  const images =
    productImages.length >= 3
      ? productImages.slice(0, 3)
      : [
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&h=200&fit=crop",
        ];

  return (
    <section className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-20 w-48 h-48 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white">
            <span className="inline-block bg-brand/20 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
              ✦ Trending
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome To
              <br />
              <span className="text-brand">OshusStore</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-md">
              Discover premium beauty and wellness products at unbeatable
              prices, delivered to your door.
            </p>
            <Button
              className="bg-brand hover:bg-brand-dark text-white rounded-full px-8 h-12 text-base font-semibold gap-2"
              asChild
            >
              <Link href="/shop">
                Start Shopping
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden h-64">
                <Image
                  src={images[0]}
                  alt="Featured product"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 66vw, 400px"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden h-30.5">
                <Image
                  src={images[1]}
                  alt="Featured product"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden h-30.5">
                <Image
                  src={images[2]}
                  alt="Featured product"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-xl">
              <h3 className="text-navy font-bold text-base mb-3">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground text-xs mb-3">
                Enter your address to check delivery options
              </p>
              <div className="flex flex-col gap-2 mb-3">
                <Input
                  placeholder="Delivery Address"
                  className="rounded-lg h-9 text-sm bg-light-gray border-0"
                />
                <Input
                  placeholder="City"
                  className="rounded-lg h-9 text-sm bg-light-gray border-0"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-muted-foreground">ETA:</span>
                <div className="flex gap-1">
                  {["30m", "1hr", "2hr"].map((time) => (
                    <span
                      key={time}
                      className="bg-navy text-white text-[10px] font-semibold px-2 py-1 rounded-full"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-coral hover:bg-coral-dark text-white rounded-lg h-9 text-sm font-semibold">
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="size-4" />
              <span>Free Delivery Over ₦50k</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>Same Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
