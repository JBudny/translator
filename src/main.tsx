import React from "react";
import { createRoot } from "react-dom/client";
import {
  MemoryRouter
} from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../theme";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  </React.StrictMode>
);
