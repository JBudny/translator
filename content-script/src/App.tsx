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

const App: FC = () => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<TranslateResponse | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const [languages, setLanguages] = useState<{ source: string, target: string }>({ source: "", target: "" });

  useEffect(() => {
    const languagesListener = () => {
      chrome.storage.local.get<ExtensionStorage>(
        ["sourceLanguage", "targetLanguage"],
        ({ sourceLanguage, targetLanguage }) => {
          if (sourceLanguage && targetLanguage)
            setLanguages({ source: sourceLanguage, target: targetLanguage });
        });
    };
    chrome.storage.onChanged.addListener(languagesListener);

    return () => {
      chrome.storage.onChanged.removeListener(languagesListener);
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
      {translation ?
        <div style={{ backgroundColor: '#fff', padding: '5px', border: '2px solid black' }}>
          <button onClick={unsetTranslation}>X</button>
          <p>{translation.translatedText}</p>
          {translation.alternatives?.length ? (
            <>
              <p>Also</p>
              <ol>
                {
                  translation.alternatives.map((alternative, index) =>
                    <li key={index}>
                      {alternative}
                    </li>)
                }
              </ol>
            </>
          ) : null}
        </div>
        : null}
      {error ? (
        <div style={{ backgroundColor: '#fff', padding: '5px', border: '2px solid black' }}>
          <button onClick={unsetError}>X</button>
          <p>Error</p>
          {error.cause ? (<p>Code: {error.cause}</p>) : null}
          <p>Message: {error.message}</p>
        </div>
      ) : null}
    </div>
  );
};

export default App;
