import { TechIcon } from "@/lib/types";

/**
 * Transforms an array of tech strings into the TechIcon object format
 */
export function formatTechIcons(tech: string[] | undefined): TechIcon[] {
  return (tech || []).map((techName) => ({
    src: techName ? `/icons/${techName}.svg` : "/icons/default.svg",
    alt: techName,
  }));
}

/**
 * Safely extracts the HTTPS url from a Contentful asset
 */
export function getContentfulImageUrl(imageField: any): string | undefined {
  if (!imageField?.fields?.file?.url) return undefined;
  return `https:${imageField.fields.file.url}`;
}