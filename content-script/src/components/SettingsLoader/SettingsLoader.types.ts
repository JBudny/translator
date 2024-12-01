export interface SettingsLoaderProps {
  onClose: () => void;
  q?: string;
  source?: string;
  target?: string;
  apiBaseURL?: string;
  apiKey?: string;
  contentUpdateCallback: () => void;
};
