import { SourceLoaderRenderProps } from "../SourceLoader";

export interface TranslationProps extends SourceLoaderRenderProps {
  onClose: () => void;
  contentUpdateCallback: () => void;
};
