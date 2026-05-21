import Image from "next/image";
import { contactMapImage } from "@/data/contact";

export function ContactMap() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[280px] md:h-[360px] grayscale">
        <Image
          src={contactMapImage}
          alt="Store location map"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
