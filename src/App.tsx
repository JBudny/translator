import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { APIBaseURLForm, APIKeyForm, LanguagesForm } from "./Forms";
import { StyledAppWrapper, StyledAppHeader } from "../components";
import { StyledAppHeading, StyledBackButton, StyledPopupWrapper } from "./components";
import { Root } from "./routes"

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
              <APIKeyForm nextRoute="/languages" />
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
