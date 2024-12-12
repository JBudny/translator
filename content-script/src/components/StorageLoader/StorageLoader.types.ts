import { ReactElement } from "react";
import { ExtensionStorage } from "../../../../api";

export interface StorageLoaderRenderProps extends ExtensionStorage {
  q?: string;
};

export interface StorageLoaderProps {
  q?: string;
  contentUpdateCallback: () => void;
  render: (props: StorageLoaderRenderProps) => ReactElement;
};
