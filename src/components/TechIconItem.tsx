import { TechIcon } from "@/lib/types";
import Image from "next/image";

interface TechIconItemProps {
  icon: TechIcon;
}

export function TechIconItem({ icon }: TechIconItemProps) {
  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      title={icon.alt}
      height={100}
      width={100}
      className="h-10 w-10"
    />
  );
}