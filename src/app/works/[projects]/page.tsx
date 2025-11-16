import { getProjectBySlug } from "@/lib/contentfulService";
import { IProjectEntry, IContentfulAsset, TechIcon } from "@/lib/types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

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

  const formattedTechIcons: TechIcon[] = (tech || []).map((techName) => {
    return {
      src: techName ? `/icons/${techName}.svg` : "/icons/default.svg",
      alt: techName,
    };
  });

  const assets = new Map(
    (linkedAssets as IContentfulAsset[])?.map((asset) => [
      asset.sys.id,
      asset,
    ]) || []
  );

  const options = {
    renderNode: {
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
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assets.get(node.data.target.sys.id);

        if (!asset || !asset.fields.file) {
          return null;
        }

        const { file, title } = asset.fields;
        const url = `https:${file.url}`;

        if (file.details.image) {
          return (
            <div className="my-6">
              <Image
                src={url}
                width={file.details.image.width}
                height={file.details.image.height}
                alt={title || "Project Image"}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          );
        }

        return (
          <div className="my-6">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              {title || file.url}
            </a>
          </div>
        );
      },
    },
  };

  return (
    <main className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-10 text-base-content">
          {title}
        </h1>

        {imageUrl && (
          <div className="mb-10">
            <Image
              src={imageUrl}
              alt={`Imagem principal do projeto ${title}`}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        )}

        <div>
          <details className="bg-base-300 rounded-lg">
            <summary className="collapse-title text-xl font-medium cursor-pointer">
              Ver Dados Brutos da Entry (project)
            </summary>
            <div className="collapse-content">
              <pre className="p-4 text-xs overflow-x-auto bg-base-100 rounded-lg">
                {JSON.stringify(project, null, 2)}
              </pre>
            </div>
          </details>

          <details className="bg-base-300 rounded-lg">
            <summary className="collapse-title text-xl font-medium cursor-pointer">
              Ver Dados Brutos dos Assets (res.includes.Asset)
            </summary>
            <div className="collapse-content">
              <pre className="p-4 text-xs overflow-x-auto bg-base-100 rounded-lg">
                {JSON.stringify(linkedAssets, null, 2)}
              </pre>
            </div>
          </details>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-6 bg-base-200 rounded-lg">
          <div className="flex gap-4">
            {systemLink && (
              <Link
                href={systemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                See System
              </Link>
            )}
            {repositoryLink && (
              <Link
                href={repositoryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Repository
              </Link>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {formattedTechIcons.map((icon) => (
              <div
                key={icon.alt}
                className="tooltip"
                data-tip={icon.alt.toUpperCase()}
              >
                <Image
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

        <article className="prose prose-lg max-w-none prose-invert">
          {documentToReactComponents(description as Document, options)}
        </article>
      </div>
    </main>
  );
}
