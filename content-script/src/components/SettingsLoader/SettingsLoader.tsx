import { FC, useEffect } from "react";
import { SettingsLoaderProps } from "./SettingsLoader.types";
import { useSettings } from "../../../../contexts";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";

export const SettingsLoader: FC<SettingsLoaderProps> = ({
  apiBaseURL,
  q,
  source,
  target,
  apiKey,
  contentUpdateCallback,
  render,
}) => {
  const [settings, fetchSettings] = useSettings();
  const { data, error, isLoading } = settings;
  const { keyRequired } = data ?? {};

  useEffect(() => {
    if (apiBaseURL) fetchSettings({ apiBaseURL });
  }, [apiBaseURL]);

  useEffect(() => {
    if (isLoading) contentUpdateCallback();
  }, [isLoading]);

  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the settings." />
      </StyledBox>
    );
  if (error) throw new Error(error);

  return render({ apiBaseURL, apiKey, keyRequired, q, source, target });
};
