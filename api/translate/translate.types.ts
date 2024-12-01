export interface TranslateResponse {
  alternatives?: string[];
  translatedText: string;
};

export interface FetchTranslationState {
  data: TranslateResponse | null;
  error: string | null;
  isLoading: boolean;
};

export interface FetchTranslateProps {
  q?: string;
  source?: string;
  target?: string;
  apiBaseURL?: string;
  apiKey?: string;
};

export type FetchTranslate = (props: FetchTranslateProps) => Promise<void>;

export type UseFetchTranslate = [FetchTranslationState, FetchTranslate];
