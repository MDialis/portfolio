// app/projetos/page.tsx
import { contentfulClient } from "@/lib/contentfulClient"; // Nosso client
import { IProjectEntry, IProjectFields } from "@/lib/types"; // Nossas interfaces
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";

// 1. Função para buscar os dados (no servidor)
async function getProjetos(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-fields.date"],
    });

    // 2. USE um "double cast" (as unknown as ...) no retorno.
    // Isso diz ao TypeScript: "Eu sei o que estou fazendo,
    // confie que 'res.items' corresponde ao tipo IProjectEntry[]".
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Erro ao buscar dados do Contentful:", error);
    return [];
  }
}

// 2. O Componente da Página (Async)
export default async function ProjetosPage() {
  const projetos = await getProjetos();

  if (!projetos || projetos.length === 0) {
    return <p>Nenhum projeto encontrado.</p>;
  }

  return (
    <div>
      <h1>Meus Projetos</h1>
      <section>
        {projetos.map((projeto) => {
          const {
            title,
            slug,
            summary,
            tech,
            cardImage,
            description, // Usaremos para a página de detalhe
          } = projeto.fields;

          // Helper para a imagem
          const imageUrl = cardImage?.fields.file.url;
          const imageAlt = cardImage?.fields.title || title;
          const imageWidth = cardImage?.fields.file.details.image.width || 500;
          const imageHeight =
            cardImage?.fields.file.details.image.height || 300;

          return (
            // Vamos fazer o card inteiro ser um link para a página do projeto
            <Link href={`/projetos/${slug}`} key={projeto.sys.id}>
              <article>
                <h2>{title}</h2>

                {/* Renderizando Imagem (se existir) */}
                {imageUrl && (
                  <Image
                    src={`https:${imageUrl}`}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                  />
                )}

                {/* Renderizando Techs (se existir) */}
                {tech && tech.length > 0 && (
                  <ul>
                    {tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}

                {/* Renderizando Resumo */}
                <p>{summary}</p>

                {/* O RichText 'description' é muito grande para um card.
                  Vamos renderizá-lo apenas na página de detalhe [slug].tsx 
                */}
                {/* {documentToReactComponents(description)} */}
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
