import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../../theme";

const app = document.createElement("div");
app.id = "translator-extension-root";

document.body.prepend(app);

const root = createRoot(app);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
