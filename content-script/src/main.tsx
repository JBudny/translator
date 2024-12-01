import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../../theme";
import { CSSReset } from "../../components";
import ShadowRoot from "react-shadow/styled-components";

const app = document.createElement("div");
document.body.prepend(app);

createRoot(app).render(
  <React.StrictMode>
    <ThemeProvider theme={schema.dark}>
      <ShadowRoot.div>
        <CSSReset />
        <App id="translator-extension-root" />
      </ShadowRoot.div>
    </ThemeProvider>
  </React.StrictMode>
);
