import { createClient } from 'contentful';
import { IExperienceEntry, IProjectEntry } from './types.ts';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID não definido no .env.local');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN não definido no .env.local');
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllProjectSlugs() {
  try {
    const res = await contentfulClient.getEntries({
      content_type: 'project',
      select: ['fields.slug'],
    });

    const projects = res.items as unknown as IProjectEntry[];
    return projects.map((project) => ({
      slug: project.fields.slug,
    }));
  } catch (error) {
    console.error('Error fetching slugs for static params:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const res = await contentfulClient.getEntries({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
      include: 10,
    });

    return res.items.length > 0 ? res : null;
  } catch (error) {
    console.error('Error fetching single project by slug:', error);
    return null;
  }
}

export async function getProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      //select: ['fields.slug'],
      order: ["-fields.date"],
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

export async function getExperiences(): Promise<IExperienceEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "experience",
      //select: ['fields.slug'],
      order: ["-fields.date"],
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IExperienceEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      //select: ['fields.slug'],
      order: ["-fields.date"],
      "fields.featured": true,
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

export async function getFeaturedExperiences(): Promise<IExperienceEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "experience",
      //select: ['fields.slug'],
      order: ["-fields.date"],
      "fields.featured": true,
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IExperienceEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}