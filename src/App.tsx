import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";
import { APIBaseURLForm, APIKeyForm, LanguagesForm } from "./Forms";
import { StyledTypography, StyledAppWrapper, StyledAppHeader } from "../components";
import { StyledPopupWrapper } from "./components";

const RequireAPIBaseURL: FC<PropsWithChildren> = ({ children }) => {
  let auth = useAuth();

  if (!auth) return <Navigate to="/" replace />;

  const { state: { apiBaseURL } } = auth;

  if (!apiBaseURL) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const RequireAPIKey: FC<PropsWithChildren> = ({ children }) => {
  let auth = useAuth();

  if (!auth) return <Navigate to="/" replace />;

  const { state: { apiKey } } = auth;

  if (!apiKey) return <Navigate to="/apikey" replace />;

  return <>{children}</>;

};

const App: FC = () => {
  return (
    <AuthProvider>
      <StyledPopupWrapper>
        <StyledAppWrapper>
          <StyledAppHeader>
            <StyledTypography $size="large" $weight="medium" as="h1">Translate</StyledTypography>
          </StyledAppHeader>
          <Routes>
            <Route element={<Outlet />}>
              <Route path="/" element={
                <APIBaseURLForm nextRoute="/apikey" />
              } />
              <Route path="/apikey" element={
                <RequireAPIBaseURL>
                  <APIKeyForm nextRoute="/languages" />
                </RequireAPIBaseURL>
              } />
              <Route path="/languages" element={
                <RequireAPIKey>
                  <LanguagesForm />
                </RequireAPIKey>
              } />
            </Route>
          </Routes>
        </StyledAppWrapper>
      </StyledPopupWrapper>
    </AuthProvider>
  );
};

export default App;
