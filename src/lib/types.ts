// lib/types.ts
import { Document } from '@contentful/rich-text-types';

// Interface para um Asset (imagem) do Contentful
// (O SDK resolve o "Link" para essa estrutura)
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

// Interface principal baseada no seu Content Model "project"
export interface IProjectFields {
  title: string;       // Symbol
  slug: string;        // Symbol
  date?: string;       // Date (vem como string ISO 8601)
  tech?: string[];     // Array of Symbol
  summary: string;     // Text
  cardImage?: IContentfulAsset;   // Link (Asset)
  mobileImage?: IContentfulAsset; // Link (Asset)
  fullImage?: IContentfulAsset;   // Link (Asset)
  description: Document; // RichText
}

// A estrutura completa da Entry que a API retorna
export interface IProjectEntry {
  sys: {
    id: string;
  };
  fields: IProjectFields;
}