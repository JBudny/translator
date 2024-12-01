export interface TranslateResponse {
  alternatives?: string[];
  translatedText: string;
};

export interface FetchTranslationState {
  data: TranslateResponse | null;
  error: string | null;
  isLoading: boolean;
};

export type FetchTranslate = (props: {
  q?: string;
  source?: string;
  target?: string;
  apiBaseURL?: string;
  apiKey?: string;
}) => Promise<void>;

export type UseFetchTranslate = [FetchTranslationState, FetchTranslate];
