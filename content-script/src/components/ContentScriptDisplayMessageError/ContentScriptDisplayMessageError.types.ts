import { FallbackProps } from "react-error-boundary";

export interface ContentScriptDisplayMessageErrorProps extends FallbackProps {
  onClose: () => void;
  contentUpdateCallback?: () => void;
};
