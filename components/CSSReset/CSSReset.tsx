import { createGlobalStyle } from 'styled-components';

export const CSSReset = createGlobalStyle`
  /*
    1. Set root element font size
    2. Create a root stacking context
  */
  #translator-extension-root {
    font-size: 16px;
    isolation: isolate;
  };
  /*
    3. Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  /*
    4. Remove default margin
  */
  * {
    margin: 0;
    line-height: calc(1em + 0.5rem);
  }
  /*
    Typographic tweaks!
    5. Add accessible line-height
    6. Improve text rendering
  */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
    7. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  /*
    8. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }
  /*
    9. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
`;
