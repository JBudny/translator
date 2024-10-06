import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../theme";
import { AuthProvider } from "./AuthProvider";
import { ServerSettingsProvider } from "./ServerSettingsProvider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <AuthProvider>
        <ServerSettingsProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ServerSettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
