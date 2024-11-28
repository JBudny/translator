export interface ExtensionStorage {
  apiKey?: string,
  apiBaseURL?: string
  sourceLanguage?: string
  targetLanguage?: string
};

export interface FetchStorageState {
  data: ExtensionStorage | null;
  error: string | null;
  isLoading: boolean;
}

export type UseFetchStorage = [FetchStorageState, () => Promise<void>];
