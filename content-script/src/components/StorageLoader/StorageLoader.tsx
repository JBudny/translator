import { FC, useEffect } from "react";
import { StorageLoaderProps } from "./StorageLoader.types";
import { useStorage } from "../../../../contexts";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";

export const StorageLoader: FC<StorageLoaderProps> = ({
  contentUpdateCallback,
  q,
  render,
}) => {
  const [storage, fetchStorage] = useStorage();
  const { data, error, isLoading } = storage;
  const {
    sourceLanguage: source,
    targetLanguage: target,
    apiBaseURL,
    apiKey,
  } = data ?? {};

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

  return render({ q, source, target, apiBaseURL, apiKey });
};
