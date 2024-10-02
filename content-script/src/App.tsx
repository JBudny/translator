import { FC, useEffect, useState } from "react";
import { TranslateButton } from "./components";
import { PositionState, SelectedTextState } from "./App.types";
import { API_ENDPOINTS, TranslateResponse } from "../../api";
import {
  MessageErrorResponse,
  TranslateActionPayload,
  sendMessage,
} from "../../service-worker";
import { ExtensionStorage } from "../../src/extensionStorage.types";
import { StyledTypography, StyledAppWrapper } from "../../components";

const App: FC = () => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<TranslateResponse | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const [languages, setLanguages] = useState<{ source: string, target: string }>({ source: "", target: "" });

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
    sendMessage<TranslateActionPayload, TranslateResponse>(translateAction)
      .then((response) => {
        if (!response.success)
          setError(response.error);

        if (response.success) {
          const { data: { translatedText, alternatives } } = response;
          setTranslation({ alternatives, translatedText });
        };

      })
      .finally(() => setSelectedText(""));
  };

  const unsetTranslation = () => {
    setTranslation(null);
  }

  const unsetError = () => {
    setError(null);
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: `calc(${position.x}px - 15px)`,
        top: `calc(${position.y}px - 45px)`,
        zIndex: '99999'
      }}
    >

      {selectedText && !translation ? <TranslateButton onClick={handleTranslationButtonClick} /> : null}
      {translation ? (
        <StyledAppWrapper>
          <button onClick={unsetTranslation}>X</button>
          <StyledTypography $size="medium" $weight="normal" as="p">
            {translation.translatedText}
          </StyledTypography>
          {translation.alternatives?.length ? (
            <>
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
            </>
          ) : null}
        </ StyledAppWrapper>
      )
        : null}
      {error ? (
        <StyledAppWrapper>
          <button onClick={unsetError}>X</button>
          <StyledTypography $size="medium" $weight="medium" as="p" $color="red500">
            Error
          </StyledTypography>
          {error.cause ? (
            <StyledTypography $size="medium" $weight="normal" as="p" $color="red500">
              Code: {error.cause}
            </StyledTypography>
          ) : null}
          <StyledTypography $size="medium" $weight="normal" as="p" $color="red500">
            Message: {error.message}
          </StyledTypography>
        </StyledAppWrapper>
      ) : null}
    </div >
  );
};

export default App;
