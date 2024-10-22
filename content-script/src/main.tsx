import '@fortawesome/fontawesome-svg-core/styles.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { schema } from "../../theme";
import { CSSReset, StyledButton } from "../../components";
import ShadowRoot from 'react-shadow/styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const app = document.createElement('div');
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
