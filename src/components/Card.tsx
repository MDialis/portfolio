"use client";

import { TechIcon } from "@/lib/types";
import Image from "next/image";
import { TechIconList } from "./TechIconList";

interface CardProps {
  title: string;
  text: string;
  link: string;
  classname?: string;
  imageUrl?: string;
  techIcons?: TechIcon[];
}

export default function Card({
  title,
  text,
  link,
  classname,
  imageUrl,
  techIcons,
}: CardProps) {
  return (
    <a
      href={link}
      draggable="false"
      onDragStart={(e) => e.preventDefault()}
      className={`select-none bg-primary text-primary-content rounded-xl shadow-xl transition-transform flex flex-col h-full overflow-hidden ${classname}`}
    >
      {imageUrl && (
        <div className="relative w-full h-56">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" draggable={false} />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="mb-4">{text}</p>

        <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:justify-between items-end pt-4">
          <TechIconList icons={techIcons} />
        </div>
      </div>
    </a>
  );
}
