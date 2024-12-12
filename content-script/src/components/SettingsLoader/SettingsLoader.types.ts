import { ReactElement } from "react";
import { SettingsResponse } from "../../../../api";
import { StorageLoaderRenderProps } from "../StorageLoader";

export interface SettingsLoaderRenderProps
  extends StorageLoaderRenderProps,
  Pick<SettingsResponse, "keyRequired"> {
};

export interface SettingsLoaderProps extends StorageLoaderRenderProps {
  contentUpdateCallback: () => void;
  render: (props: SettingsLoaderRenderProps) => ReactElement;
};
