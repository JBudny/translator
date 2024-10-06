interface Language {
  source: {
    code: string;
    name: string;
  };
  target: {
    code: string;
    name: string;
  };
};

export interface ServerSettingsResponse {
  apiKeys: boolean;
  charLimit: number;
  filesTranslation: true;
  frontendTimeout: number;
  keyRequired: boolean;
  language: Language;
  suggestions: boolean;
  supportedFilesFormat: string[];
};
