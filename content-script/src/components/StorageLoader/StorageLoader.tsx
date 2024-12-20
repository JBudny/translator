import { FC, useEffect } from "react";
import { StorageLoaderProps } from "./StorageLoader.types";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";
import { useFetchStorage } from "@/api";

export const StorageLoader: FC<StorageLoaderProps> = ({
  contentUpdateCallback,
  q,
  render,
}) => {
  const [storage, fetchStorage] = useFetchStorage();
  const { data, error, isLoading } = storage;

  useEffect(() => {
    fetchStorage();
  }, []);

  useEffect(() => {
    if (isLoading) contentUpdateCallback();
  }, [isLoading]);

  if (error) throw new Error(error);
  if (data === null)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Initializing StorageLoader." />
      </StyledBox>
    );
  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the storage." />
      </StyledBox>
    );

  const { apiBaseURL, apiKey, detect, source, target } = data;

  return render({ apiBaseURL, apiKey, detect, q, source, target });
};
