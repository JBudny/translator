import { FC, useEffect, useState } from "react";
import {
  ClientRectAware,
  PositionState,
  StyledList,
  TranslateButton,
} from "./components";
import { AppProps, SelectedTextState } from "./App.types";
import { MessageErrorResponse } from "../../service-worker";
import {
  StyledText,
  StyledButton,
  StyledBox,
  DisplayMessageError,
  StyledDistribute,
  StyledJustify,
  StyledLoadingIndicator,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { AsyncStatus } from "../../types";
import { useStorage } from "../../contexts";
import { useFetchTranslate } from "../../api/translate/translate.hooks";

const App: FC<AppProps> = (props) => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [error, setError] = useState<MessageErrorResponse["message"] | null>(
    null
  );
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [storage, fetchStorage] = useStorage();
  const [translation, fetchTranslation] = useFetchTranslate();

  const getTranslation = async () => {
    if (
      !selectedText ||
      !storage.data?.sourceLanguage ||
      !storage.data?.targetLanguage
    )
      return;
    setStatus("pending");
    fetchTranslation({
      q: selectedText,
      source: storage.data?.sourceLanguage,
      target: storage.data?.targetLanguage,
      apiBaseURL: storage.data?.apiBaseURL,
      apiKey: storage.data?.apiKey,
    });
  };

  useEffect(() => {
    const handleMouseUp = ({ x, y }: MouseEvent) => {
      if (translation?.data?.translatedText.length) return;
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

  const unsetError = () => {
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    getTranslation();
  };

  // Array of tags that selected text inside of could be selected without
  // triggering translation feature
  const disabledTags = ["INPUT", "TEXTAREA"];
  const activeElement = document.activeElement;
  const isTranslationEnabled =
    activeElement && !disabledTags.includes(activeElement.tagName);

  return (
    <ClientRectAware position={position} {...props}>
      {status === "pending" ? (
        <StyledBox padding="spacing3" background="gray700">
          <StyledLoadingIndicator title="Waiting for translation" />
        </StyledBox>
      ) : null}
      {status === "idle" &&
        isTranslationEnabled &&
        selectedText &&
        !translation &&
        !error ? (
        <TranslateButton onClick={handleTranslationButtonClick} />
      ) : null}
      {status === "idle" && translation ? (
        <StyledBox
          background="gray700"
          padding="spacing3"
          style={{ transition: "all 230ms" }}
        >
          <StyledDistribute gap="spacing2">
            <StyledJustify justify="flex-start">
              <StyledButton onClick={() => { }}>
                <FontAwesomeIcon icon={faClose} height="1em" />
              </StyledButton>
            </StyledJustify>
            <StyledText $size="medium" $weight="normal" as="p">
              {translation.data?.translatedText}
            </StyledText>
            {translation.data?.alternatives?.length ? (
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
                    {translation.data.alternatives.map((alternative, index) => (
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
          </StyledDistribute>
        </StyledBox>
      ) : null}
      {status === "idle" && error ? (
        <StyledBox background="gray700" padding="spacing3">
          <StyledDistribute gap="spacing2">
            <StyledJustify justify="flex-start">
              <StyledButton onClick={unsetError}>
                <FontAwesomeIcon icon={faClose} height="1em" />
              </StyledButton>
            </StyledJustify>
            <DisplayMessageError message={error} onRetry={handleRetry} />
          </StyledDistribute>
        </StyledBox>
      ) : null}
    </ClientRectAware>
  );
};

export default App;
