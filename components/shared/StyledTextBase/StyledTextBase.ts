import styled, { css } from 'styled-components';
import { StyledTextBaseProps } from './StyledTextBase.types';

export const StyledTextBaseCSS = css<StyledTextBaseProps>`
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: ${({ theme, $weight }) => theme.font.weight[$weight]};
  font-size: ${({ theme, $size }) => theme.font.size[$size]};
  color: ${({ theme, $color }) =>
    `rgb(${$color ? theme.palette[$color] : theme.palette.gray100})`};
`

export const StyledTextBase = styled.span<StyledTextBaseProps>`
  ${StyledTextBaseCSS}
`;
