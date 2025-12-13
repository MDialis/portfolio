import { TechIcon } from "@/lib/types";
import Image from "next/image";

interface TechIconItemProps {
  icon: TechIcon;
  className?: string;
}

export function TechIconItem({ icon, className }: TechIconItemProps) {
  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      title={icon.alt}
      height={100}
      width={100}
      className={`h-10 w-10 ${className}`}
    />
  );
}