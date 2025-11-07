import Image from "next/image";

interface CardProps {
  title: string;
  text: string;
  link: string;
  imageUrl?: string;
}

export default function Card({ title, text, link, imageUrl }: CardProps) {
  return (
    <div className="bg-primary text-primary-content rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex flex-col h-full overflow-hidden">
      
      {imageUrl && (
        <div className="relative w-full h-56">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-2xl font-bold mb-3">{title}</h4>
        <p className="mb-4">{text}</p>
        <a
          href={link}
          className="font-semibold text-accent hover:underline mt-auto"
        >
          See more &rarr;
        </a>
      </div>
    </div>
  );
}