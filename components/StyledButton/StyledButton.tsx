import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";
import { TileProps, StyledTileCSS } from '../shared';

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const StyledButtonBase = styled.button<TileProps>`
  padding: ${({ theme }) => theme.tokens.spacing2};
  color: ${({ theme }) => `rgb(${theme.palette.gray100})`};
  border-radius: ${({ theme }) => theme.tokens.borderRadius2};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray300})`};
  border: none;

  &:disabled {
    opacity: ${({ theme }) => theme.tokens.opacity2};
  };
`;

export const StyledButton: FC<StyledButtonProps> = ({ children, ...props }) => {

  return (
    <StyledButtonBase $variant="default" {...props}>
      {children}
    </StyledButtonBase>
  );
};
