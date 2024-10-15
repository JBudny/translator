import { FC } from "react";
import { StyledDistributeProps, StyledDistributeBaseProps } from './StyledDistribute.types';
import styled, { css } from "styled-components";

export const StyledDistributeBaseCSS = css<StyledDistributeBaseProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.tokens[$gap]};
`;

export const StyledDistributeBase = styled.div<StyledDistributeBaseProps>`
  ${StyledDistributeBaseCSS};
`;

export const StyledDistribute: FC<StyledDistributeProps> = ({
  children,
  direction = 'column',
  gap = 'spacing1',
  ...props
}) => {

  return (
    <StyledDistributeBase $direction={direction} $gap={gap} {...props}>
      {children}
    </StyledDistributeBase>
  );
};
