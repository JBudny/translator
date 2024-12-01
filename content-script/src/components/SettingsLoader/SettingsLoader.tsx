import { FC, useEffect } from "react";
import { SettingsLoaderProps } from "./SettingsLoader.types";
import { useSettings } from "../../../../contexts";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";
import { Translation } from "../Translation";

export const SettingsLoader: FC<SettingsLoaderProps> = ({
  apiBaseURL,
  onClose,
  q,
  source,
  target,
  apiKey,
  contentUpdateCallback,
}) => {
  const [settings, fetchSettings] = useSettings();
  const { data, error, isLoading } = settings;
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

  return (
    <Translation
      contentUpdateCallback={contentUpdateCallback}
      onClose={onClose}
      q={q}
      source={source}
      target={target}
      apiBaseURL={apiBaseURL}
      keyRequired={data?.keyRequired}
      apiKey={apiKey}
    />
  );
};
