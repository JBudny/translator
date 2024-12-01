import { FC, useState } from "react";
import {
  ClientRectAware,
  ContentScriptDisplayMessageError,
  StorageLoader,
} from "./components";
import { AppProps, RenderErrorFallbackComponentProps } from "./App.types";
import { StyledButton } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { SettingsProvider, StorageProvider } from "../../contexts";
import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "styled-components";
import { useSelectedText } from "./hooks";
import { shouldRenderContent } from "./App.utils";

const App: FC<AppProps> = (props) => {
  const {
    palette: { gray100 },
  } = useTheme();
  const [openTranslation, setOpenTranslation] = useState(false);
  const { position, selectedText, setSelectedText } = useSelectedText();

  if (!shouldRenderContent()) return null;

  const handleOpenTranslation = () => setOpenTranslation(true);
  const handleCloseTranslation = () => {
    setSelectedText("");
    setOpenTranslation(false);
  };

  const renderErrorFallbackComponent = ({
    contentUpdateCallback,
    ...props
  }: RenderErrorFallbackComponentProps) => (
    <ContentScriptDisplayMessageError
      onClose={handleCloseTranslation}
      contentUpdateCallback={contentUpdateCallback}
      {...props}
    />
  );

  const renderTranslationButton = () => (
    <StyledButton onClick={handleOpenTranslation}>
      <FontAwesomeIcon
        icon={faBookOpen}
        height="1em"
        color={`rgb(${gray100})`}
      />
    </StyledButton>
  );

  const renderTranslation = (recalculateClientRect: () => void) => (
    <StorageProvider>
      <SettingsProvider>
        {/* TODO: StorageLoader shoulad accept renderprop to render
        SettingsLoader and then TranslationResult */}
        <StorageLoader
          onClose={handleCloseTranslation}
          contentUpdateCallback={recalculateClientRect}
          selectedText={selectedText}
        />
      </SettingsProvider>
    </StorageProvider>
  );

  return (
    <ClientRectAware
      position={position}
      render={(recalculateClientRect) => (
        <ErrorBoundary
          FallbackComponent={(props) =>
            renderErrorFallbackComponent({
              ...props,
              contentUpdateCallback: recalculateClientRect,
            })
          }
        >
          {selectedText && !openTranslation ? renderTranslationButton() : null}
          {openTranslation ? renderTranslation(recalculateClientRect) : null}
        </ErrorBoundary>
      )}
      {...props}
    />
  );
};

export default App;

