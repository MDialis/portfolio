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
      {fullImage ? (
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-end justify-start overflow-hidden bg-base-300">
          {/* Background Full Image */}
          <Image
            src={`https:${fullImage.fields.file.url}`}
            alt={fullImage.fields.title || `Card Image of ${title}`}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          {/* Hero Content */}
          <div className="
            relative z-10 h-full
            w-full px-4 md:w-11/12 md:px-0 lg:w-10/12
            mx-auto text-white 
            flex flex-col justify-end">
            <Link
              href="/works"
              className="absolute top-0 left-0 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium hover:bg-white/20 transition flex items-center gap-2"
            >
              Back
            </Link>

            <div className="flex flex-col gap-6">
              {/* Tech Icons */}
              <div className="flex flex-wrap gap-2">
                {formattedTechIcons.map((icon) => (
                  <div
                    key={icon.alt}
                    className="badge badge-neutral gap-2 p-2 text-white border-white/20 bg-black/40 backdrop-blur-md rounded-xl"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={16}
                      height={16}
                      className="w-4 h-4 invert"
                    />
                    {icon.alt}
                  </div>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-md">
                  {title}
                </h1>
                <p className="mt-2 text-white/80 font-medium">
                  {date ? new Date(date).getFullYear() : ""}
                </p>
              </div>

              {/* Summary */}
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-sm">
                {summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-2">
                {systemLink && (
                  <a
                    href={systemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-md md:btn-lg gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    Visitar Site
                  </a>
                )}
                {repositoryLink && (
                  <a
                    href={repositoryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-md md:btn-lg gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (cardImage && cardImage.fields.file.details.image) ||
        (mobileImage && mobileImage.fields.file.details.image) ? (
        <></>
      ) : (
        <></>
      )}

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
