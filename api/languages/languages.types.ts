import { NormalizedSchema } from "normalizr";

export interface Language {
  "code": string;
  "name": string;
  "targets": string[];
};

export type LanguagesResponse = Language[];

export type NormalizedLanguagesResponse = NormalizedSchema<{
  languages: {
    [key: string]: Language;
  };
}, string[]>;
