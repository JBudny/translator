export interface ExtensionStorage {
  apiKey?: string;
  apiBaseURL?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
};

export interface FetchStorageState {
  data: ExtensionStorage | null;
  error: string | null;
  isLoading: boolean;
};

export type FetchStorage = (props?: {
  onSuccess?: () => void;
}) => Promise<void>;

export type SetStorage = ({
  items,
  onSuccess,
}: {
  currentStorage: ExtensionStorage;
  items: Partial<ExtensionStorage>;
  onSuccess?: () => void;
}) => Promise<void>;

export type UseFetchStorage = [FetchStorageState, FetchStorage, SetStorage];
