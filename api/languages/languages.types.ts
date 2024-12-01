import { NormalizedSchema } from "normalizr";

export interface Language {
  code: string;
  name: string;
  targets: string[];
};

export type LanguagesResponse = NormalizedSchema<
  {
    languages: {
      [key: string]: Language;
    };
  },
  string[]
>;

export interface FetchLanguagesState {
  data: LanguagesResponse | null;
  error: string | null;
  isLoading: boolean;
};

export type FetchLanguages = (props: {
  apiBaseURL?: string;
  onSuccess?: (response: LanguagesResponse) => void;
}) => Promise<void>;

export type UseFetchLanguages = [FetchLanguagesState, FetchLanguages];
