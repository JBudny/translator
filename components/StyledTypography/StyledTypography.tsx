import { FC, PropsWithChildren } from 'react';
import { StyledTypographyBaseProps, StyledTypographyProps } from './StyledTypography.types';
import styled, { css } from 'styled-components';

export const StyledTypographyBaseCSS = css<StyledTypographyBaseProps>`
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: ${({ theme, $weight }) => theme.font.weight[$weight]};
  font-size: ${({ theme, $size }) => theme.font.size[$size]};
  color: ${({ theme, $color }) =>
    `rgb(${$color ? theme.palette[$color] : theme.palette.gray100})`};
`

export const StyledTypographyBase = styled.span<StyledTypographyBaseProps>`
  ${StyledTypographyBaseCSS}
`;


export const StyledTypography: FC<PropsWithChildren<StyledTypographyProps>> =
  ({ children, ...props }) =>
    <StyledTypographyBase {...props}>{children}</StyledTypographyBase>
