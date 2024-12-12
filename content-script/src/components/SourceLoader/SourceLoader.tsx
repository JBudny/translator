import { FC, useEffect } from "react";
import { SourceLoaderProps } from "./SourceLoader.types";
import { StyledBox, StyledLoadingIndicator } from "../../../../components";
import { useFetchDetect } from "../../../../api";

export const SourceLoader: FC<SourceLoaderProps> = ({
  apiBaseURL,
  apiKey,
  contentUpdateCallback,
  keyRequired,
  q,
  render,
  source,
  target,
  detect,
}) => {
  const [detection, fetchDetect] = useFetchDetect();
  const { data, error, isLoading } = detection;

  useEffect(() => {
    if (detect) {
      if (keyRequired && !apiKey)
        throw new Error("API Key is required, but not set.");

      fetchDetect({ apiBaseURL, apiKey, q });
    }
  }, []);

  useEffect(() => {
    if (isLoading) contentUpdateCallback();
  }, [isLoading]);

  if (!detect)
    return render({
      apiBaseURL,
      apiKey,
      keyRequired,
      q,
      source,
      target,
    });

  if (error) throw new Error(error);
  if (data === null)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Initializing SourceLoader." />
      </StyledBox>
    );
  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the language detection." />
      </StyledBox>
    );

  const mostConfidentLanguage = data.reduce((acc, curr) => {
    return curr.confidence > acc.confidence ? curr : acc;
  }, data[0]).language;

  return render({
    apiBaseURL,
    apiKey,
    keyRequired,
    q,
    source: mostConfidentLanguage,
    target,
  });
};
