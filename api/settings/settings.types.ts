interface SettingsLanguage {
  source: {
    code: string;
    name: string;
  };
  target: {
    code: string;
    name: string;
  };
};

export interface SettingsResponse {
  apiKeys: boolean;
  charLimit: number;
  filesTranslation: true;
  frontendTimeout: number;
  keyRequired: boolean;
  Settings: SettingsLanguage;
  suggestions: boolean;
  supportedFilesFormat: string[];
};

export interface FetchSettingsState {
  data: SettingsResponse | null;
  error: string | null;
  isLoading: boolean;
}

export type UseFetchSettings = [FetchSettingsState, (apiBaseURL?: string) => Promise<void>];
