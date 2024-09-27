export interface Language {
  "code": string;
  "name": string;
  "targets": string[];
};

export type LanguagesResponse = Language[];
