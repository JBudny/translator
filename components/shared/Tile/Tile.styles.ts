import { css } from "styled-components";
import { TileProps } from "./Tile.types";

export const StyledTileCSS = css<TileProps>`
  box-shadow: ${({ theme, $variant }) => `rgba(${theme.palette.gray500}, ${$variant === 'highlighted' ? theme.tokens.opacity1 : theme.tokens.opacity2}) 0px 0px ${theme.tokens.spacing1} 1px`};
`
