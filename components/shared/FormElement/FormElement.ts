import { css } from "styled-components";
import { StyledFormElementCSSProps } from "./FormElement.types";

export const StyledFormElementCSS = css<StyledFormElementCSSProps>`
  background-color: ${({ theme }) => `rgb(${theme.palette.gray300})`};
`;
