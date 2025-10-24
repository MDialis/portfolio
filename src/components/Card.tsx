interface CardProps {
  title: string;
  text: string;
  link: string;
}

export default function Card({ title, text, link }: CardProps) {
  return (
    <div className="p-6 bg-primary text-primary-content rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex flex-col h-full">
      <h4 className="text-2xl font-bold mb-3">{title}</h4>
      <p className="mb-4">{text}</p>
      <a
        href={link}
        className="font-semibold text-accent hover:underline mt-auto"
      >
        See more &rarr;
      </a>
    </div>
  );
}
