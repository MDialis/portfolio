import { contentfulClient } from "@/lib/contentfulClient";
import { IProjectEntry } from "@/lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { notFound } from "next/navigation";

interface TechIcon {
  src: string;
  alt: string;
}

export async function generateStaticParams() {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      select: ["fields.slug"],
    });

    const projects = res.items as unknown as IProjectEntry[];
    return projects.map((project) => ({
      slug: project.fields.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs for static params:", error);
    return [];
  }
}

async function getProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-fields.date"],
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

async function getProjectBySlug(slug: string) {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      "fields.slug": slug,
      limit: 1,
      include: 10,
    });

    return res.items.length > 0 ? res : null;
  } catch (error) {
    console.error("Error fetching single project by slug:", error);
    return null;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await getProjectBySlug(params.slug);

  if (!res) {
    notFound();
  }

  const project = res.items[0] as unknown as IProjectEntry;
  const linkedAssets = res.includes?.Asset;

  const {
    title,
    repositoryLink,
    systemLink,
    slug,
    tech,
    date,
    summary,
    description,
    cardImage,
    mobileImage,
    fullImage,
  } = project.fields;

  const imageUrl = fullImage ? `https:${fullImage.fields.file.url}` : undefined;

  // Formata os ícones de tecnologia
  const formattedTechIcons: TechIcon[] = (tech || []).map((techName) => {
    return {
      src: techName ? `/icons/${techName}.svg` : "/icons/default.svg",
      alt: techName,
    };
  });

  const assets = new Map(
    linkedAssets?.map((asset: ContentfulAsset) => [asset.sys.id, asset]) || []
  );

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assets.get(node.data.target.sys.id);
        if (!asset) {
          return null;
        }
        return (
          <div className="my-6">
            <img
              src={`https:${asset.fields.file.url}`}
              width={asset.fields.file.details.image.width}
              height={asset.fields.file.details.image.height}
              alt={asset.fields.title || "Imagem do projeto"}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        );
      },
      // Adicione estilos para outros nós (Tailwind Typography)
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="my-4 text-lg leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
      ),
    },
  };

  return (
    <main className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título */}
        <h1 className="text-5xl font-bold text-center mb-10 text-base-content">
          {title}
        </h1>

        {/* Imagem Principal */}
        {imageUrl && (
          <div className="mb-10">
            <img
              src={imageUrl}
              alt={`Imagem principal do projeto ${title}`}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        )}

        {/* Links e Tecnologias */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-6 bg-base-200 rounded-lg">
          {/* Links */}
          <div className="flex gap-4">
            {systemLink && (
              <a
                href={systemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                See System
              </a>
            )}
            {repositoryLink && (
              <a
                href={repositoryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Repository
              </a>
            )}
          </div>

          {/* Tecnologias */}
          <div className="flex flex-wrap justify-center gap-3">
            {formattedTechIcons.map((icon) => (
              <div
                key={icon.alt}
                className="tooltip"
                data-tip={icon.alt.toUpperCase()}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Descrição (Rich Text) */}
        <article className="prose prose-lg max-w-none prose-invert">
          {documentToReactComponents(description as Document, options)}
        </article>
      </div>
    </main>
  );
}
