import styled from "styled-components";
import { StyledAnimationBaseProps, StyledAnimationProps } from "./StyledAnimation.types";
import { FC } from "react";

const StyledAnimationBase = styled.div<StyledAnimationBaseProps>`
  animation-name: ${({ $animation, theme }) => theme.animations[$animation]};
  animation-duration: ${({ $duration }) => $duration};
  animation-iteration-count: infinite;
`;

export const StyledAnimation: FC<StyledAnimationProps> = ({ animation, duration = '230ms', children }) => {

  return <StyledAnimationBase $animation={animation} $duration={duration}>{children}</StyledAnimationBase>
}