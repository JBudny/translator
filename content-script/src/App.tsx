import { FC, useState } from "react";
import {
  ClientRectAware,
  ContentScriptDisplayMessageError,
  SettingsLoader,
  StorageLoader,
  Translation,
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
        <StorageLoader
          contentUpdateCallback={recalculateClientRect}
          q={selectedText}
          render={(props) => (
            <SettingsLoader
              contentUpdateCallback={recalculateClientRect}
              render={(props) => (
                <Translation
                  onClose={handleCloseTranslation}
                  contentUpdateCallback={recalculateClientRect}
                  {...props}
                />
              )}
              {...props}
            />
          )}
        />
      </SettingsProvider>
    </StorageProvider>
  );

  const renderContent = (recalculateClientRect: () => void) => (
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
  );

  return (
    <ClientRectAware position={position} render={renderContent} {...props} />
  );
};

export default App;
