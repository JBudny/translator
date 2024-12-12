import { FC, useEffect } from "react";
import { TranslationProps } from "./Translation.types";
import { useFetchTranslate } from "../../../../api";
import {
  StyledBox,
  StyledDistribute,
  StyledLoadingIndicator,
  StyledText,
} from "../../../../components";
import { ContentScriptLayout } from "../ContentScriptLayout";
import { StyledList } from "../StyledList";

export const Translation: FC<TranslationProps> = ({
  apiBaseURL,
  keyRequired,
  onClose,
  q,
  source,
  target,
  apiKey,
  contentUpdateCallback,
}) => {
  const [translation, fetchTranslation] = useFetchTranslate();
  const { data, error, isLoading } = translation;

  useEffect(() => {
    if (keyRequired && !apiKey)
      throw new Error("API Key is required, but not set.");

    fetchTranslation({ apiBaseURL, q, source, target, apiKey });
  }, []);

  useEffect(() => {
    contentUpdateCallback();
  }, [isLoading]);

  if (error) throw new Error(error);
  if (data === null)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Initialization Translation." />
      </StyledBox>
    );
  if (isLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for translation." />
      </StyledBox>
    );

  const { translatedText, alternatives } = data;

  return (
    <ContentScriptLayout onClose={onClose}>
      <StyledText $size="medium" $weight="normal" as="p">
        {data.translatedText}
      </StyledText>
      {alternatives?.length ? (
        <StyledBox
          padding="spacing2"
          background="gray500"
          rounding="borderRadius2"
        >
          <StyledDistribute gap="spacing1">
            <StyledText $size="medium" $weight="normal" as="p">
              Alternative translations
            </StyledText>
            <StyledList as="ol">
              {alternatives.map((alternative, index) => (
                <StyledList.ListItem key={index}>
                  <StyledText $size="small" $weight="normal" as="span">
                    {alternative}
                  </StyledText>
                </StyledList.ListItem>
              ))}
            </StyledList>
          </StyledDistribute>
        </StyledBox>
      ) : null}
    </ContentScriptLayout>
  );
};
