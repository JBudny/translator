export interface TranslationProps {
  onClose: () => void;
  q?: string;
  source?: string;
  target?: string;
  apiBaseURL?: string;
  keyRequired?: boolean;
  apiKey?: string;
  contentUpdateCallback: () => void;
};
