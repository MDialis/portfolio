import { TechIcon } from "@/lib/types";
import Image from "next/image";
import { TechIconList } from "./TechIconList";

interface ListItemProps {
  title: string;
  slug: string;
  summary: string;
  cardImageUrl?: string;
  mobileImageUrl?: string;
  formattedTechIcons: TechIcon[];
}

export default function ListItem({
  title,
  slug,
  summary,
  cardImageUrl,
  mobileImageUrl,
  formattedTechIcons,
}: ListItemProps) {
  return (
    <a
      key={slug}
      href={`/works/${slug}`}
      className="
        group relative flex flex-col
        border-t border-base-content/40
        w-full py-3 px-2 md:gap-1
        hover:text-accent hover:border-accent/40
        hover:pl-4 md:hover:pl-5 lg:hover:pl-6
        transition-all duration-200
      "
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-3xl font-semibold min-w-0 truncate">
          {title}
        </h3>
        {formattedTechIcons && formattedTechIcons.length > 0 ? (
          <TechIconList
            icons={formattedTechIcons}
            iconClass="h-6 w-6 md:h-8 md:w-8"
            className="
              bg-neutral/50
              self-start p-1 px-2 shrink-0
              gap-2 md:gap-4 duration-300
              group-hover:bg-accent/10 group-hover:gap-3 md:group-hover:gap-5"
          />
        ) : (
          <></>
        )}
      </div>

      <p className="px-4 text-sm md:text-md line-clamp-2 text-ellipsis group-hover:pl-5 md:group-hover:pl-7 lg:group-hover:pl-8 duration-400">
        {summary}
      </p>

      {/* Images for Card and Mobile */}
      {(cardImageUrl || mobileImageUrl) && (
        <div
          className="
            absolute mt-4 h-64 p-5 rounded-xl
            right-0 lg:-right-15 -top-1/2
            pointer-events-none opacity-0
            group-hover:pointer-events-auto group-hover:opacity-100 
            transition duration-300
          "
        >
          {mobileImageUrl && (
            <Image
              src={mobileImageUrl}
              alt={title}
              className="aspect-4/6 h-full object-cover rounded-lg shadow-2xl md:hidden"
            />
          )}

          {cardImageUrl && (
            <Image
              src={cardImageUrl}
              alt={title}
              className="aspect-video h-full object-cover rounded-lg shadow-2xl hidden md:block"
            />
          )}
        </div>
      )}
    </a>
  );
}
