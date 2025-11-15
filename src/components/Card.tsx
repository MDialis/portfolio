import Image from "next/image";

interface TechIcon {
  src: string;
  alt: string;
}

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
    <div className="bg-primary text-primary-content rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex flex-col h-full overflow-hidden">
      {imageUrl && (
        <div className="relative w-full h-56">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-2xl font-bold mb-3">{title}</h4>
        <p className="mb-4">{text}</p>

        <div className="mt-auto flex justify-between items-end pt-4">
          {techIcons && techIcons.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-1 bg-neutral/30 rounded-2xl">
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

          <a
            href={link}
            className="font-semibold text-accent hover:underline mt-auto"
          >
            See more &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}