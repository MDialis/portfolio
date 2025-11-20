import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { IContentfulAsset } from "@/lib/types";

interface RichTextRendererProps {
  content: Document;
  linkedAssets?: any[]; // or IContentfulAsset[]
}

export default function RichTextRenderer({ content, linkedAssets }: RichTextRendererProps) {
  // Create the asset map inside the component
  const assetMap = new Map(
    (linkedAssets as IContentfulAsset[])?.map((asset) => [asset.sys.id, asset]) || []
  );

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
        <p className="my-4 text-lg leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (_: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_: any, children: React.ReactNode) => (
        <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset || !asset.fields.file) return null;

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
            <a href={url} target="_blank" rel="noopener noreferrer" className="link link-primary">
              {title || file.url}
            </a>
          </div>
        );
      },
    },
  };

  return (
    <article className="prose prose-lg max-w-none prose-invert">
      {documentToReactComponents(content, options)}
    </article>
  );
}
