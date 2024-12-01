import { ReactElement } from "react";
import { FetchTranslateProps } from "../../../../api";

export interface StorageLoaderProps {
  q?: string;
  contentUpdateCallback: () => void;
  render: (props: FetchTranslateProps) => ReactElement;
};
