import { NormalizedSchema } from "normalizr";

export interface Language {
  "code": string;
  "name": string;
  "targets": string[];
};

export type LanguagesResponse = NormalizedSchema<{
  languages: {
    [key: string]: Language;
  };
}, string[]>;

export interface FetchLanguagesState {
  data: LanguagesResponse | null;
  error: string | null;
  isLoading: boolean;
}

export type UseFetchLanguages = [
  FetchLanguagesState,
  (apiBaseURL?: string) => Promise<void>
];