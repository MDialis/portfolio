import { Document } from '@contentful/rich-text-types';
interface IContentfulAsset {
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface IProjectFields {
  title: string;                  // Symbol
  repositoryLink?: string;        // Symbol
  systemLink?: string;            // Symbol
  slug: string;                   // Symbol
  tech?: string[];                // Array of Symbol
  date?: string;                  // Date (String ISO 8601)
  summary: string;                // Text
  description: Document;          // RichText
  cardImage?: IContentfulAsset;   // Link (Asset)
  mobileImage?: IContentfulAsset; // Link (Asset)
  fullImage?: IContentfulAsset;   // Link (Asset)
  featured?: boolean;             // Boolean
}

export interface IProjectEntry {
  sys: {
    id: string;
  };
  fields: IProjectFields;
}

export interface IExperienceFields {
  title: string;              // Symbol
  position: string;           // Symbol
  systemLink?: string;        // Symbol
  repositoryLink?: string;    // Symbol
  tech?: string[];            // Array of Symbol
  date?: string;              // Date (String ISO 8601)
  summary: string;            // Text
  image?: IContentfulAsset;   // Link (Asset)
  featured?: boolean;         // Boolean
}

export interface IExperienceEntry {
  sys: {
    id: string;
  };
  fields: IExperienceFields;
}