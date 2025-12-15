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
    <main>
      {fullImage ? (
        <div>
          <section className="relative w-full h-[55vh] min-h-[500px] flex items-end justify-start overflow-hidden bg-base-300">
            {/* Background Full Image */}
            <Image
              src={`https:${fullImage.fields.file.url}`}
              alt={fullImage.fields.title || `Card Image of ${title}`}
              fill
              className="object-cover object-top"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

            {/* Hero Content */}
            <div
              className="
                relative z-10 h-full
                w-full px-4 md:w-11/12 md:px-0 lg:w-10/12
                mx-auto text-base-content 
                flex flex-col justify-end"
            >
              {/* Back to projects button */}
              <Link
                href="/works"
                className="
                absolute top-5 left-0
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
                Explore Projects
              </Link>

              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 py-8">
                {/* Title */}
                <div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-md">
                    {title}
                  </h1>
                  <p className="mt-1 text-base-content font-bold">
                    {date ? new Date(date).getFullYear() : ""}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 my-auto">
                  {systemLink && <Button link={systemLink} text="Check out!" />}
                  {repositoryLink && (
                    <Button link={repositoryLink} text="Repository" />
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="relative w-full h-[55vh] min-h-[500px] flex items-center py-12 md:py-0 bg-base-300">
            <div className="w-full md:w-11/12 lg:w-10/12 px-4 md:px-0 mx-auto grid grid-cols-1 md:grid-cols-5 h-full">
              {/* Content Column */}
              <div
                className="
                    relative z-10 h-full
                    w-full md:col-span-2
                    mx-auto text-base-content
                    flex flex-col justify-end 
                    order-2 md:order-1
              "
              >
                {/* Back to projects button */}
                <Link
                  href="/works"
                  className="
                    absolute top-5 left-0
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
                  Explore Projects
                </Link>

                <div className="flex flex-col gap-6 py-8">
                  {/* Title */}
                  <div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-md">
                      {title}
                    </h1>
                    <p className="mt-1 text-base-content font-bold">
                      {date ? new Date(date).getFullYear() : ""}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 my-auto">
                    {systemLink && (
                      <Button link={systemLink} text="Check out!" />
                    )}
                    {repositoryLink && (
                      <Button link={repositoryLink} text="Repository" />
                    )}
                  </div>
                </div>
              </div>

              {/* Images Column */}
              <div className="flex justify-between items-center order-1 md:order-2 md:col-span-3">
                {cardImage && (
                  <LaptopFrame
                    src={cardImage.fields.file.url} 
                  />
                )}
                {mobileImage && (
                  <PhoneFrame
                    src={mobileImage.fields.file.url}
                    width={200}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (cardImage && cardImage.fields.file.details.image) ||
        (mobileImage && mobileImage.fields.file.details.image) ? (
        <></>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-1 md:grid-cols-7">
        <div className="md:col-span-2">
          <div className="p-12 space-y-4">
            <h3 className="text-lg font-bold">Details</h3>
            {/* <p>slug: {slug}</p> */}
            <div className="flex flex-wrap justify-center gap-3">
              <TechIconList
                icons={formattedTechIcons}
                iconClass="hover:mx-1 duration-300"
                className="
                  bg-neutral/50
                  self-start p-1 px-2 shrink-0
                  gap-2 md:gap-4 duration-300
                  hover:bg-accent/10 hover:gap-3 md:hover:gap-5"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="p-12 mx-auto max-w-5xl">
            <div>
              <article className="prose prose-lg max-w-none prose-invert">
                {documentToReactComponents(description as Document, options)}
              </article>
            </div>

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
          </div>
        </div>
      </div>
    </main>
  );
}
