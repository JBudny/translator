import { PropsWithChildren } from "react";

export interface ContentScriptLayoutProps extends PropsWithChildren {
  onClose: () => void;
};
