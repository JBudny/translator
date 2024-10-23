import { PropsWithChildren } from "react";
import { Animations } from "../../theme/schema.types";

type Animation = keyof Animations;

export interface StyledAnimationBaseProps {
  $animation: Animation;
  $duration: string;
};

export interface StyledAnimationProps extends PropsWithChildren {
  animation: Animation;
  duration?: string;
};