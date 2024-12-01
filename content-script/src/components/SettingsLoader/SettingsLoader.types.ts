import { ReactElement } from "react";
import { FetchTranslateProps } from "../../../../api";

interface SettingsLoaderRenderProps extends FetchTranslateProps {
  keyRequired?: boolean;
};

export interface SettingsLoaderProps extends FetchTranslateProps {
  contentUpdateCallback: () => void;
  render: (props: SettingsLoaderRenderProps) => ReactElement;
};
