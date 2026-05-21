import { MapPin } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            Deliver to Lagos, Nigeria
          </span>
          <span className="hidden md:inline">
            Free shipping on orders over ₦50,000
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Track Order</span>
          <span>Help</span>
          <span className="hidden sm:inline">₦ NGN</span>
        </div>
      </div>
    </div>
  );
}
