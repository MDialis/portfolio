import { getProjectBySlug } from "@/lib/contentfulService";
import { IProjectEntry, IContentfulAsset, TechIcon } from "@/lib/types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { TechIconList } from "@/components/TechIconList";
import Button from "@/components/Button";
import PhoneFrame from "@/components/PhoneFrame";
import LaptopFrame from "@/components/LaptopFrame";

export type ProjectPageProps = {
  params: Promise<{ project: string }>;
  searchParams: Promise<{ lang?: string }>;
};

const dictionaries = {
  en: {
    explore: "Explore Projects",
    checkOut: "Check out!",
    repository: "Repository",
    details: "Details",
    madeIn: "Made in",
    dateNotAvailable: "Date not available",
  },
  pt: {
    explore: "Explorar Projetos",
    checkOut: "Confira!",
    repository: "Repositório",
    details: "Detalhes",
    madeIn: "Feito em",
    dateNotAvailable: "Data não disponível",
  },
};

export default async function ProjectPage({
  params,
  searchParams,
}: ProjectPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang = resolvedSearchParams?.lang === "pt" ? "pt" : "en";
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const dict = dictionaries[lang];

  const res = await getProjectBySlug(resolvedParams.project, locale);

  if (!res || !res.items || res.items.length === 0) {
    notFound();
  }

  const project = res.items[0] as unknown as IProjectEntry;
  const linkedAssets = res.includes?.Asset;

  const {
    title,
    repositoryLink,
    systemLink,
    tech,
    date,
    description,
    cardImage,
    mobileImage,
    fullImage,
  } = project.fields;

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
    ]) || [],
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

        const { file, assetTitle, assetDescription } = asset.fields as any;
        const url = `https:${file.url}`;

        if (file.details.image) {
          return (
            <div className="my-6">
              <Image
                src={url}
                width={file.details.image.width}
                height={file.details.image.height}
                alt={assetDescription || assetTitle || "Project Image"}
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
              {assetTitle || file.url}
            </a>
          </div>
        );
      },
    },
  };

  {/* Back to projects button */ }
  const BackButton = () => (
    <Link
      href={`/works?lang=${lang}`}
      className="
        absolute top-5 left-10
        flex items-center px-3 p-2 gap-2 
        bg-base-200/20 backdrop-blur-md rounded-full
        hover:bg-base-200/40 transition-all duration-300"
    >
      {/* Left Top Arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
        />
      </svg>
      {dict.explore}
    </Link>
  );

  return (
    <main>
      {fullImage ? (
        <section className="relative w-full h-[55vh] min-h-[500px] flex items-end justify-start overflow-hidden bg-base-300">
          <Image
            src={`https:${fullImage.fields.file.url}`}
            alt={fullImage.fields.title || `Card Image of ${title}`}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          <div className="relative z-10 h-full w-full px-4 md:w-11/12 md:px-0 lg:w-10/12 mx-auto text-base-content flex flex-col justify-end">
            <BackButton />
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 py-8">
              {/* Title */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-md">
                  {title}
                </h1>
                <p className="mt-1 text-base-content font-bold">
                  {date ? new Date(date).getFullYear() : ""}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 my-auto">
                {systemLink && <Button link={systemLink} text={dict.checkOut} />}
                {repositoryLink && <Button link={repositoryLink} text={dict.repository} />}
              </div>
            </div>
          </div>
        </section>
      ) : (cardImage && cardImage.fields.file.details.image) || (mobileImage && mobileImage.fields.file.details.image) ? (
        <section className="relative w-full h-[55vh] min-h-[500px] flex items-center md:py-12 bg-base-300">
          <div className="relative w-full md:w-11/12 lg:w-10/12 px-4 md:px-0 mx-auto grid grid-cols-1 lg:grid-cols-5 h-full">
            <BackButton />
            {/* Content Column */}
            <div className="
              relative z-10 h-full
              w-full md:col-span-2
              mx-auto text-base-content
              flex flex-col justify-end 
              order-2 lg:order-1"
            >
              <div className="flex flex-col md:flex-row lg:flex-col justify-between gap-6 py-8">
                {/* Title */}
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-md">
                    {title}
                  </h1>
                  <p className="mt-1 text-base-content font-bold">
                    {date ? new Date(date).getFullYear() : ""}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 my-auto">
                  {systemLink && <Button link={systemLink} text={dict.checkOut} />}
                  {repositoryLink && <Button link={repositoryLink} text={dict.repository} />}
                </div>
              </div>
            </div>

            {/* Images Column */}
            <div className="flex justify-between items-center order-1 lg:order-2 md:col-span-3 pt-25 md:pt-15 lg:pt-0">
              {cardImage && <LaptopFrame src={cardImage.fields.file.url} />}
              {mobileImage && <PhoneFrame src={mobileImage.fields.file.url} />}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative w-full min-h-[40vh] flex flex-col items-center justify-center bg-base-300 py-20 text-center">
          <BackButton />
          <div className="flex flex-col gap-6 py-8">
            {/* Title */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-md">
                {title}
              </h1>
              <p className="mt-1 text-base-content font-bold">
                {date ? new Date(date).getFullYear() : ""}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mx-auto">
              {systemLink && <Button link={systemLink} text={dict.checkOut} />}
              {repositoryLink && <Button link={repositoryLink} text={dict.repository} />}
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-7">
        <div className="md:col-span-2">
          <div className="p-6 md:p-12 space-y-4">
            <h3 className="text-lg font-bold">{dict.details}</h3>
            {/* <p>slug: {slug}</p> */}
            <div className="flex flex-col gap-6">
              <TechIconList
                icons={formattedTechIcons}
                iconClass="hover:mx-1 duration-300"
                className="bg-neutral/50 p-1 px-2 shrink-0 gap-2 md:gap-4 duration-300 hover:bg-accent/10 hover:gap-3 md:hover:gap-5"
              />

              <p className="text-sm font-semibold">
                {date ? (
                  <>
                    {dict.madeIn}{" "}
                    {new Date(date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </>
                ) : (
                  dict.dateNotAvailable
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="p-6 md:p-12 mx-auto max-w-5xl">
            <div>
              <article className="prose prose-lg max-w-none prose-invert">
                {documentToReactComponents(description as Document, options)}
              </article>
            </div>

            {/* Debugging Info 
            <div>
              <details className="bg-base-300 rounded-lg">
                <summary className="collapse-title text-xl font-medium cursor-pointer">
                  Raw data (project)
                </summary>
                <div className="collapse-content">
                  <pre className="p-4 text-xs overflow-x-auto bg-base-100 rounded-lg">
                    {JSON.stringify(project, null, 2)}
                  </pre>
                </div>
              </details>

              <details className="bg-base-300 rounded-lg">
                <summary className="collapse-title text-xl font-medium cursor-pointer">
                  Assets Raw Data (res.includes.Asset)
                </summary>
                <div className="collapse-content">
                  <pre className="p-4 text-xs overflow-x-auto bg-base-100 rounded-lg">
                    {JSON.stringify(linkedAssets, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
            */}
          </div>
        </div>
      </div>
    </main>
  );
}
