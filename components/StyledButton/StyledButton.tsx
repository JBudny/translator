import { FC } from "react";
import styled from "styled-components";
import { StyledButtonProps } from './StyledButton.types';

const StyledButtonBase = styled.button<StyledButtonProps>`
  padding: ${({ theme }) => theme.tokens.spacing2};
  color: ${({ theme }) => `rgb(${theme.palette.gray100})`};
  border-radius: ${({ theme }) => theme.tokens.borderRadius2};
  background-color: ${({ theme, $appearance }) =>
    $appearance === 'filled' && `rgb(${theme.palette.gray300})` ||
    $appearance === 'transparent' && 'transparent'
  };
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: ${({ theme }) => theme.tokens.opacity2};
    cursor: default;
  };
`;

export const StyledButton: FC<StyledButtonProps> = ({ children, $appearance = 'filled', ...props }) => {

  return (
    <StyledButtonBase $appearance={$appearance} {...props}>
      {children}
    </StyledButtonBase>
  );
};
