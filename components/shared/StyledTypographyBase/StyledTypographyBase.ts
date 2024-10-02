import styled, { css } from 'styled-components';
import { StyledTypographyBaseProps } from './StyledTypographyBase.types';

export const StyledTypographyBaseCSS = css<StyledTypographyBaseProps>`
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: ${({ theme, $weight }) => theme.font.weight[$weight]};
  font-size: ${({ theme, $size }) => theme.font.size[$size]};
  color: ${({ theme, $color }) =>
    `rgb(${$color ? theme.palette[$color] : theme.palette.gray100})`};
  line-height: 1;
`

export const StyledTypographyBase = styled.span<StyledTypographyBaseProps>`
  ${StyledTypographyBaseCSS}
`;
