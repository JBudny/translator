import { createGlobalStyle } from 'styled-components'

export const CSSResetPopup = createGlobalStyle`
  /*
    1. Set the user-select to none for the content-script
  */
  * {
    user-select: none;
  }
`;
