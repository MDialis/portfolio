import { TechIcon } from "@/lib/types";
import Image from "next/image";

interface CardProps {
  title: string;
  text: string;
  link: string;
  imageUrl?: string;
  techIcons?: TechIcon[];
}

export default function Card({
  title,
  text,
  link,
  imageUrl,
  techIcons,
}: CardProps) {
  return (
    <a href={link}>
      <div className="bg-primary text-primary-content rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex flex-col h-full overflow-hidden">
        {imageUrl && (
          <div className="relative w-full h-56">
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h4 className="text-2xl font-bold mb-3">{title}</h4>
          <p className="mb-4">{text}</p>

          <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:justify-between items-end pt-4">
            {techIcons && techIcons.length > 0 ? (
              <div className="flex flex-wrap gap-4 p-2 bg-neutral/30 rounded-2xl self-center">
                {techIcons.map((icon) => (
                  <img
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt}
                    title={icon.alt}
                    className="h-10 w-10"
                  />
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
