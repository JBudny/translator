import { FC, useEffect } from "react";
import { SettingsLoaderProps } from "./SettingsLoader.types";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";
import { useFetchSettings } from "@/api";

export const SettingsLoader: FC<SettingsLoaderProps> = ({
  apiBaseURL,
  q,
  source,
  target,
  apiKey,
  contentUpdateCallback,
  render,
  detect,
}) => {
  const [settings, fetchSettings] = useFetchSettings();
  const { data, error, isLoading } = settings;

  useEffect(() => {
    fetchSettings({ apiBaseURL });
  }, []);

  useEffect(() => {
    if (isLoading) contentUpdateCallback();
  }, [isLoading]);

  if (error) throw new Error(error);
  if (data === null)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Initializing SettingsLoader." />
      </StyledBox>
    );

  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the settings." />
      </StyledBox>
    );

  const { keyRequired } = data;

  return render({ apiBaseURL, apiKey, keyRequired, q, source, target, detect });
};

