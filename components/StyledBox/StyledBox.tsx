import { FC } from "react";
import styled from "styled-components";
import { StyledBoxBaseProps, StyledBoxProps } from './StyledBox.types';

const StyledBoxBase = styled.div<StyledBoxBaseProps>`
  padding: ${({ theme, $padding }) => $padding === 'none' ? '0px' : theme.tokens[$padding]};
  background-color: ${({ theme, $background }) => $background === 'none' ? 'none' : `rgb(${theme.palette[$background]})`};
  border-radius: ${({ theme, $rounding }) => $rounding === 'none' ? '0px' : theme.tokens[$rounding]};
`;

export const StyledBox: FC<StyledBoxProps> = ({ children, padding = 'none', background = 'none', rounding = 'none', ...props }) => {

  return (
    <StyledBoxBase $padding={padding} $background={background} $rounding={rounding} {...props}>{children}</StyledBoxBase>
  );
};
