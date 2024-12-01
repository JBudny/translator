import { FC, useEffect } from "react";
import { StorageLoaderProps } from "./StorageLoader.types";
import { useStorage } from "../../../../contexts";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";
import { SettingsLoader } from "../SettingsLoader";

export const StorageLoader: FC<StorageLoaderProps> = ({
  onClose,
  contentUpdateCallback,
  selectedText,
}) => {
  const [storage, fetchStorage] = useStorage();
  const { data, error, isLoading } = storage;

  useEffect(() => {
    fetchStorage();
  }, []);

  useEffect(() => {
    if (isLoading) contentUpdateCallback();
  }, [isLoading]);

  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the storage." />
      </StyledBox>
    );
  if (error) throw new Error(error);

  return (
    <SettingsLoader
      contentUpdateCallback={contentUpdateCallback}
      onClose={onClose}
      q={selectedText}
      source={data?.sourceLanguage}
      target={data?.targetLanguage}
      apiBaseURL={data?.apiBaseURL}
      apiKey={data?.apiKey}
    />
  );
};
