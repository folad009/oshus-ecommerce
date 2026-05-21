import { Globe, MessageCircle, Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactInfo } from "@/data/contact";

const socialIcons = [Globe, MessageCircle, Send];

export function ContactInfoCard() {
  const { address, phone, email, hours } = contactInfo;

  return (
    <div className="bg-forest rounded-2xl p-6 md:p-8 text-white h-full">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-start gap-3 mb-2">
            <MapPin className="size-5 shrink-0 mt-0.5 text-cart-yellow" />
            <div>
              <p className="text-xs text-white/70 mb-1">Address</p>
              <p className="text-sm font-medium leading-relaxed">{address}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Phone className="size-5 shrink-0 text-cart-yellow" />
            <div>
              <p className="text-xs text-white/70">Phone</p>
              <p className="text-sm font-medium">{phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="size-5 shrink-0 text-cart-yellow" />
            <div>
              <p className="text-xs text-white/70">Email</p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <Clock className="size-5 shrink-0 mt-0.5 text-cart-yellow" />
            <div>
              <p className="text-xs text-white/70 mb-2">Open Time</p>
              <p className="text-sm font-medium">{hours.weekdays}</p>
              <p className="text-sm font-medium mt-1">{hours.weekend}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Stay Connected</p>
          <div className="flex gap-2">
            {socialIcons.map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="size-9 rounded-full bg-cart-yellow flex items-center justify-center hover:bg-cart-yellow/90 transition-colors"
                aria-label="Social link"
              >
                <Icon className="size-4 text-forest" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
