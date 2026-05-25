import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { images } from "@/constants/images";

type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<LogoSize, { image: number; text: string }> = {
  sm: { image: 32, text: "text-base" },
  md: { image: 40, text: "text-xl" },
  lg: { image: 48, text: "text-2xl" },
  xl: { image: 80, text: "text-3xl" },
};

interface LogoProps {
  href?: string;
  showText?: boolean;
  size?: LogoSize;
  className?: string;
  textClassName?: string;
  accentClassName?: string;
}

export function Logo({
  href = "/",
  showText = true,
  size = "md",
  className,
  textClassName,
  accentClassName = "text-brand",
}: LogoProps) {
  const { image, text } = sizeMap[size];
  const wrapperClass = cn("flex items-center gap-2 shrink-0", className);

  const content = (
    <>
      <Image
        src={images.logo}
        alt="Oshus Store"
        width={image}
        height={image}
        className="shrink-0 object-contain"
        priority
      />
      {showText && (
        <span className={cn("font-bold text-navy", text, textClassName)}>
          Oshus<span className={accentClassName}>Store</span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
