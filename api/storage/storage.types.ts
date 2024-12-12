export interface ExtensionStorage {
  apiKey?: string;
  apiBaseURL?: string;
  detect?: boolean;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface FetchStorageState {
  data: ExtensionStorage | null;
  error: string | null;
  isLoading: boolean;
}

interface FetchStorageProps {
  onSuccess?: () => void;
}

export type FetchStorage = (props?: FetchStorageProps) => Promise<void>;

interface SetStorageProps {
  currentStorage: ExtensionStorage;
  items: Partial<ExtensionStorage>;
  onSuccess?: () => void;
}

export type SetStorage = (props: SetStorageProps) => Promise<void>;

export type UseFetchStorage = [FetchStorageState, FetchStorage, SetStorage];
