import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { APIBaseURLForm, APIKeyForm, LanguagesForm } from "./forms";
import { StyledAppWrapper, StyledAppHeader } from "../components";
import { StyledAppHeading, StyledBackButton, StyledPopupWrapper } from "./components";
import { KeyRequired, Root } from "./routes"

const App: FC = () => {
  return (
    <StyledPopupWrapper>
      <StyledAppWrapper>
        <Routes>
          <Route element={
            <Root>
              <StyledAppHeader>
                <StyledBackButton />
                <StyledAppHeading>Translator</StyledAppHeading>
              </StyledAppHeader>
              <Outlet />
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
      </StyledAppWrapper>
    </StyledPopupWrapper>
  );
};

export default App;
