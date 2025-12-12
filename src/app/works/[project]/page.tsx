import { getProjectBySlug } from "@/lib/contentfulService";
import { IProjectEntry, IContentfulAsset, TechIcon } from "@/lib/types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

export type ProjectPageProps = {
  params: Promise<{ project: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProjectPage(props: ProjectPageProps) {
  const { params: awaitedParams } = props;
    const params = await awaitedParams;

  const res = await getProjectBySlug(params.project);

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

  const options: Parameters<typeof documentToReactComponents>[1] = {
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
          Title: {title}
        </h1>
        <p>repositoryLink: {repositoryLink}</p>
        <p>systemLink: {systemLink}</p>
        <p>slug: {slug}</p>
        <p>tech: {tech}</p>
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
        <p>date: {date}</p>
        <p>summary: {summary}</p>
        <div>
          description:
          <article className="prose prose-lg max-w-none prose-invert">
            {documentToReactComponents(description as Document, options)}
          </article>
        </div>
        <p>
          cardImage:
          {cardImage && cardImage.fields.file.details.image && (
            <Image
              src={`https:${cardImage.fields.file.url}`}
              alt={cardImage.fields.title || `Card Image of ${title}`}
              width={cardImage.fields.file.details.image.width}
              height={cardImage.fields.file.details.image.height}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          )}
        </p>
        <p>
          mobileImage:
          {mobileImage && mobileImage.fields.file.details.image && (
            <Image
              src={`https:${mobileImage.fields.file.url}`}
              alt={mobileImage.fields.title || `Card Image of ${title}`}
              width={mobileImage.fields.file.details.image.width}
              height={mobileImage.fields.file.details.image.height}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          )}
        </p>
        <p>
          fullImage:
          {fullImage && fullImage.fields.file.details.image && (
            <Image
              src={`https:${fullImage.fields.file.url}`}
              alt={fullImage.fields.title || `Card Image of ${title}`}
              width={fullImage.fields.file.details.image.width}
              height={fullImage.fields.file.details.image.height}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          )}
        </p>

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
      </div>
    </main>
  );
}
