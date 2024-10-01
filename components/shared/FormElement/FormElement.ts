import { css } from "styled-components";
import { StyledTileCSS } from "../Tile";
import { StyledFormElementCSSProps } from "./FormElement.types";

export const StyledFormElementCSS = css<StyledFormElementCSSProps>`
  ${StyledTileCSS};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray300})`};
`;
