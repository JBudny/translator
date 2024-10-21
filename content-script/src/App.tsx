import { FC, useEffect, useState } from "react";
import { ClientRectAware, PositionState, StyledList, TranslateButton } from "./components";
import { AppProps, SelectedTextState } from "./App.types";
import { API_ENDPOINTS, TranslateResponse } from "../../api";
import {
  MessageErrorResponse,
  TranslateActionPayload,
  sendMessage,
} from "../../service-worker";
import { ExtensionStorage } from "../../src/extensionStorage.types";
import {
  StyledText,
  StyledButton,
  StyledBox,
  DisplayMessageError,
  StyledDistribute,
  StyledJustify
} from "../../components";

const App: FC<AppProps> = (props) => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<TranslateResponse | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const [languages, setLanguages] = useState<{ source: string, target: string }>({ source: "", target: "" });

  const getTranslation = async () => {
    if (!selectedText) return;
    const { source, target } = languages;
    const translateAction = {
      type: API_ENDPOINTS.TRANSLATE,
      payload: {
        q: selectedText,
        source,
        target
      }
    };
    const translation = await sendMessage<TranslateActionPayload, TranslateResponse>(translateAction)
    if (!translation.success) {
      setTranslation(null);
      const { error } = translation;
      setError(error);

      return;
    };
    const { data } = translation;
    setTranslation(data);
    setSelectedText("");
  };

  useEffect(() => {
    const getLanguages = () => {
      chrome.storage.local.get<ExtensionStorage>(
        ["sourceLanguage", "targetLanguage"],
        ({ sourceLanguage, targetLanguage }) => {
          if (sourceLanguage && targetLanguage)
            setLanguages({ source: sourceLanguage, target: targetLanguage });
        });
    };
    // Get languages initially
    getLanguages();
    // Set languages listener for language change events
    chrome.storage.onChanged.addListener(getLanguages);

    return () => {
      chrome.storage.onChanged.removeListener(getLanguages);
    };
  }, []);

  useEffect(() => {
    const handleMouseUp = ({ x, y }: MouseEvent) => {
      if (translation?.translatedText.length) return;
      const currentSelectedText = window.getSelection()?.toString().trim();
      if (selectedText === currentSelectedText) return;
      setPosition({ x, y });
      setSelectedText(currentSelectedText);
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selectedText, translation]);

  const handleTranslationButtonClick = async () => {
    getTranslation();
  };

  const unsetTranslation = () => {
    setTranslation(null);
  }

  const unsetError = () => {
    setError(null);
  }

  const handleRetry = () => {
    setError(null);
    getTranslation();
  };

  // Check if activeElement is body in order to avoid rendering translation
  // button when user has input focused.
  const isActiveBody = document.activeElement === document.body;

  return (
    <ClientRectAware position={position} {...props}>
      {
        isActiveBody && selectedText && !translation &&
          !error ? <TranslateButton onClick={handleTranslationButtonClick} /> : null
      }
      {translation ? (
        <StyledBox background="gray700" padding="spacing3">
          <StyledDistribute gap="spacing3">
            <StyledJustify justify="start">
              <StyledButton onClick={unsetTranslation}>
                <StyledText $size="medium" $weight="medium" as="span">
                  X
                </StyledText>
              </StyledButton>
            </StyledJustify>
            <StyledText $size="medium" $weight="normal" as="p">
              {translation.translatedText}
            </StyledText>
            {translation.alternatives?.length ? (
              <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
                <StyledDistribute gap="spacing2">
                  <StyledText $size="medium" $weight="normal" as="p">
                    Alternative translations
                  </StyledText>
                  <StyledList as="ol">
                    {
                      translation.alternatives.map((alternative, index) =>
                        <StyledList.ListItem key={index}>
                          <StyledText $size="small" $weight="normal" as="span">
                            {alternative}
                          </StyledText>
                        </StyledList.ListItem>)
                    }
                  </StyledList>
                </StyledDistribute>
              </StyledBox>
            ) : null}
          </StyledDistribute>
        </ StyledBox>
      )
        : null}
      {error ? (
        <StyledBox background="gray700" padding="spacing3">
          <StyledDistribute gap="spacing3">
            <StyledJustify justify="start">
              <StyledButton onClick={unsetError}>
                <StyledText $size="medium" $weight="medium" as="span">
                  X
                </StyledText>
              </StyledButton>
            </StyledJustify>
            <DisplayMessageError error={error} onRetry={handleRetry} />
          </StyledDistribute>
        </StyledBox>
      ) : null}
    </ClientRectAware>
  );
};

export default App;
