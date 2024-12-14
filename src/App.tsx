import { FC } from "react";
import { Outlet, Route, Routes } from "react-router";
import { APIBaseURLForm, APIKeyForm, LanguagesForm } from "./forms";
import {
  DisplayMessageError,
  StyledAppHeader,
  StyledBox,
  StyledText,
} from "../components";
import { StyledBackButton, StyledPopupWrapper } from "./components";
import { SettingsProvider, StorageProvider } from "../contexts";
import { ErrorBoundary } from "react-error-boundary";
import { KeyRequired } from "./routes";

const App: FC = () => {
  return (
    <StyledPopupWrapper>
      <Routes>
        <Route
          element={
            <>
              <StyledAppHeader>
                <StyledBackButton />
                <StyledBox padding="spacing2">
                  <StyledText $size="medium" $weight="medium" as="h1">
                    Translator
                  </StyledText>
                </StyledBox>
              </StyledAppHeader>
              <StyledBox background="gray700" padding="spacing3">
                <ErrorBoundary FallbackComponent={DisplayMessageError}>
                  <StorageProvider>
                    <SettingsProvider>
                      <Outlet />
                    </SettingsProvider>
                  </StorageProvider>
                </ErrorBoundary>
              </StyledBox>
            </>
          }
        >
          <Route path="/" element={<APIBaseURLForm nextRoute="/apikey" />} />
          <Route
            path="/apikey"
            element={
              <KeyRequired>
                <APIKeyForm nextRoute="/languages" />
              </KeyRequired>
            }
          />
          <Route path="/languages" element={<LanguagesForm />} />
        </Route>
      </Routes>
    </StyledPopupWrapper>
  );
};

export default App;
