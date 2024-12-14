import '@fortawesome/fontawesome-svg-core/styles.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../theme";
import { CSSReset } from "../components";
import { CSSResetPopup } from "./components";

const root = document.getElementById("translator-extension-root");

if (!root) throw new Error("Translator root element not found.");

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <CSSReset />
      <CSSResetPopup />
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  </React.StrictMode>
);
