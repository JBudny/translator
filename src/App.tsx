import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { APIBaseURLForm, APIKeyForm, LanguagesForm } from "./forms";
import { StyledAppHeader, StyledBox, StyledText } from "../components";
import { StyledBackButton, StyledPopupWrapper } from "./components";
import { KeyRequired, Root } from "./routes"
import { SettingsProvider, StorageProvider } from "../contexts";

const App: FC = () => {
  return (
    <StyledPopupWrapper>
      <Routes>
        <Route element={
          <Root>
            <StyledAppHeader>
              <StyledBackButton />
              <StyledBox padding="spacing2">
                <StyledText $size="medium" $weight="medium" as="h1">
                  Translator
                </StyledText>
              </StyledBox>
            </StyledAppHeader>
            <StyledBox background="gray700" padding="spacing3">
              <StorageProvider>
                <SettingsProvider>
                  <Outlet />
                </SettingsProvider>
              </StorageProvider>
            </StyledBox>
          </Root>
        }>
          <Route path="/" element={
            <APIBaseURLForm nextRoute="/apikey" />
          } />
          <Route path="/apikey" element={
            <KeyRequired>
              <APIKeyForm nextRoute="/languages" />
            </KeyRequired>
          } />
          <Route path="/languages" element={
            <LanguagesForm />
          } />
        </Route>
      </Routes>
    </StyledPopupWrapper>
  );
};

export default App;
