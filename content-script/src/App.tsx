import { FC, useEffect, useState } from "react";
import { ClientRectAware, PositionState, StyledList, TranslateButton } from "./components";
import { AppProps, SelectedTextState } from "./App.types";
import { TranslateResponse } from "../../api";
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
  StyledJustify,
  StyledLoadingIndicator
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { AsyncStatus } from '../../types';
import { translateAction } from "../../service-worker/service_worker.actions";

const App: FC<AppProps> = (props) => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [translation, setTranslation] = useState<TranslateResponse | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const [languages, setLanguages] = useState<{ source: string, target: string }>({ source: "", target: "" });
  const [status, setStatus] = useState<AsyncStatus>('idle');

  const getTranslation = async () => {
    if (!selectedText) return;
    const { source, target } = languages;
    setStatus('pending');
    sendMessage<TranslateActionPayload, TranslateResponse>(translateAction(selectedText, source, target))
      .then(translation => {
        if (!translation.success) {
          setTranslation(null);
          const { error } = translation;
          setError(error);

          return;
        };

        const { data } = translation;
        setTranslation(data);
        setSelectedText("");
      })
      .catch((error) => {
        setTranslation(null);
        if (error instanceof Error) {
          const { message, cause } = error;
          if (typeof cause === 'number') {
            setError({ message, cause })

            return;
          };

          setError({ message });
        }
      })
      .finally(() => {
        setStatus('idle');
      });
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

  // Array of tags that selected text inside of could be selected without
  // triggering translation feature
  const disabledTags = ['INPUT', 'TEXTAREA'];
  const activeElement = document.activeElement;
  const isTranslationEnabled = activeElement && !disabledTags.includes(activeElement.tagName);

  return (
    <ClientRectAware position={position} {...props}>
      {status === 'pending' ?
        <StyledBox padding="spacing3" background="gray700">
          <StyledLoadingIndicator title="Waiting for translation" />
        </StyledBox>
        : null}
      {
        status === 'idle' && isTranslationEnabled && selectedText && !translation &&
          !error ? <TranslateButton onClick={handleTranslationButtonClick} /> : null
      }
      {status === 'idle' && translation ? (
        <StyledBox background="gray700" padding="spacing3" style={{ transition: "all 230ms" }}>
          <StyledDistribute gap="spacing2">
            <StyledJustify justify="flex-start">
              <StyledButton onClick={unsetTranslation}>
                <FontAwesomeIcon icon={faClose} height="1em" />
              </StyledButton>
            </StyledJustify>
            <StyledText $size="medium" $weight="normal" as="p">
              {translation.translatedText}
            </StyledText>
            {translation.alternatives?.length ? (
              <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
                <StyledDistribute gap="spacing1">
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
      {status === 'idle' && error ? (
        <StyledBox background="gray700" padding="spacing3">
          <StyledDistribute gap="spacing2">
            <StyledJustify justify="flex-start">
              <StyledButton onClick={unsetError}>
                <FontAwesomeIcon icon={faClose} height="1em" />
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
