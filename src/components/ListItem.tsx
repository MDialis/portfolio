import { TechIcon } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface ListItemProps {
  title: string;
  text: string;
  link: string;
  techIcons: TechIcon[];
}

/**
 * Componente para exibir um item em formato de lista,
 * com título, texto, link e ícones de tecnologia.
 */
export default function ListItem({
  title,
  text,
  link,
  techIcons,
}: ListItemProps) {
  return (
    <div className="py-6">
      {/* Título como Link */}
      <Link
        href={link}
        // Abre links externos (como os de 'experiences') em nova aba
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        <h3 className="text-2xl font-semibold text-base-content">{title}</h3>
      </Link>

      {/* Resumo */}
      <p className="text-base-content/80 my-3">{text}</p>

      {/* Ícones de Tecnologia */}
      <div className="flex flex-wrap gap-2 mt-4">
        {techIcons.map((icon) => (
          <Image
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            title={icon.alt} // Dica: 'title' dá o hover text
            width={24}
            height={24}
            className="h-6 w-6"
          />
        ))}
      </div>
    </div>
  );
}