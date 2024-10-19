import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../theme";
import { ServerSettingsProvider, UserSettingsProvider } from "./contexts";
import { CSSReset } from "../components";
import { CSSResetPopup } from "./components";

const root = document.getElementById("translator-extension-root");

if (!root) throw new Error("Translator root element not found.");

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <UserSettingsProvider>
        <ServerSettingsProvider>
          <MemoryRouter>
            <CSSReset />
            <CSSResetPopup />
            <App />
          </MemoryRouter>
        </ServerSettingsProvider>
      </UserSettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
