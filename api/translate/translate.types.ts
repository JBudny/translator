import { TranslateActionPayload } from "../../service-worker";

export interface TranslateResponse {
  alternatives?: string[];
  translatedText: string;
};

export interface FetchTranslationState {
  data: TranslateResponse | null;
  error: string | null;
  isLoading: boolean;
}

export type UseFetchTranslate = [
  FetchTranslationState,
  (props: TranslateActionPayload) => Promise<void>
];