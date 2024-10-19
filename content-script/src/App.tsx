import { FC, HTMLAttributes, useEffect, useState } from "react";
import { TranslateButton } from "./components";
import { PositionState, SelectedTextState } from "./App.types";
import { API_ENDPOINTS, TranslateResponse } from "../../api";
import {
  MessageErrorResponse,
  TranslateActionPayload,
  sendMessage,
} from "../../service-worker";
import { ExtensionStorage } from "../../src/extensionStorage.types";
import {
  StyledTypography,
  StyledButton,
  StyledBox,
  DisplayMessageError,
  StyledDistribute,
  StyledJustify
} from "../../components";

interface AppProps extends HTMLAttributes<HTMLDivElement> { }

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

  return (
    <StyledBox
      rounding="borderRadius1"
      style={{
        position: 'fixed',
        left: `calc(${position.x}px - 15px)`,
        top: `calc(${position.y}px - 45px)`,
        zIndex: '99999',
        maxWidth: '75ch',
        overflow: 'hidden'
      }}
      {...props}
    >
      {selectedText && !translation && !error ? <TranslateButton onClick={handleTranslationButtonClick} /> : null}
      {translation ? (
        <StyledBox background="gray700" padding="spacing3">
          <StyledDistribute gap="spacing3">
            <StyledJustify justify="start">
              <StyledButton onClick={unsetTranslation}>
                <StyledTypography $size="medium" $weight="medium" as="span">
                  X
                </StyledTypography>
              </StyledButton>
            </StyledJustify>
            <StyledTypography $size="medium" $weight="normal" as="p">
              {translation.translatedText}
            </StyledTypography>
            {translation.alternatives?.length ? (
              <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
                <StyledDistribute gap="spacing2">
                  <StyledTypography $size="medium" $weight="normal" as="p">
                    Alternative translations
                  </StyledTypography>
                  <ol>
                    {
                      translation.alternatives.map((alternative, index) =>
                        <li key={index}>
                          <StyledTypography $size="small" $weight="normal" as="span">
                            {alternative}
                          </StyledTypography>
                        </li>)
                    }
                  </ol>
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
                <StyledTypography $size="medium" $weight="medium" as="span">
                  X
                </StyledTypography>
              </StyledButton>
            </StyledJustify>
            <DisplayMessageError error={error} onRetry={handleRetry} />
          </StyledDistribute>
        </StyledBox>
      ) : null}
    </StyledBox >
  );
};

export default App;
