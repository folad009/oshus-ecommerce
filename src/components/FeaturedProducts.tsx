import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredBanners } from "@/data/banners";
import { formatNaira } from "@/lib/currency";

export function FeaturedProducts() {
  return (
    <section className="py-10 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">Featured Products</h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button className="size-8 rounded-full border border-border bg-white flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-8 rounded-full border border-border bg-navy text-white flex items-center justify-center">
                <ChevronRight className="size-4" />
              </button>
            </div>
            <Button
              variant="ghost"
              className="text-coral text-sm font-semibold hover:text-coral-dark gap-1"
            >
              See all
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Banner Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Banner 1 - Dark */}
          <div className="bg-navy rounded-2xl p-6 relative overflow-hidden h-32 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">
                {featuredBanners[0].title}
              </h3>
              <p className="text-white/60 text-xs mb-3">
                {featuredBanners[0].subtitle}
              </p>
            </div>
            <span className="text-white text-2xl font-bold">
              {featuredBanners[0].price != null &&
                formatNaira(featuredBanners[0].price)}
            </span>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <Image
                src={featuredBanners[0].image}
                alt={featuredBanners[0].title}
                fill
                className="object-cover rounded-tr-3xl"
              />
            </div>
          </div>

          {/* Banner 2 - Coral */}
          <div className="bg-[#E8A090] rounded-2xl p-6 relative overflow-hidden h-32 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">
                {featuredBanners[1].title}
              </h3>
              <p className="text-white/80 text-xs mb-3">
                {featuredBanners[1].subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white text-2xl font-bold">
                {featuredBanners[1].price != null &&
                  formatNaira(featuredBanners[1].price)}
              </span>
              <span className="text-white/70 text-xs">per box</span>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <Image
                src={featuredBanners[1].image}
                alt={featuredBanners[1].title}
                fill
                className="object-cover rounded-tr-3xl"
              />
            </div>
          </div>

          {/* Banner 3 - Light */}
          <div className="bg-cream rounded-2xl p-6 relative overflow-hidden h-32 flex flex-col justify-between">
            <div>
              <h3 className="text-navy text-lg font-bold mb-1">
                {featuredBanners[2].title}
              </h3>
              <p className="text-navy/60 text-xs mb-3">
                {featuredBanners[2].subtitle}
              </p>
            </div>
            <Button className="w-fit bg-coral hover:bg-coral-dark text-white rounded-full px-5 h-9 text-xs font-semibold gap-1.5">
              Shop Now
              <ArrowRight className="size-3" />
            </Button>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <Image
                src={featuredBanners[2].image}
                alt={featuredBanners[2].title}
                fill
                className="object-cover rounded-tr-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
