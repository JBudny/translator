import { ReactElement } from "react";
import { SettingsLoaderRenderProps } from "../SettingsLoader";

export interface SourceLoaderRenderProps extends Omit<SettingsLoaderRenderProps, 'detect'> { };

export interface SourceLoaderProps extends SettingsLoaderRenderProps {
  contentUpdateCallback: () => void;
  render: (props: SourceLoaderRenderProps) => ReactElement;
};
