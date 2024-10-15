import { PropsWithChildren } from "react";
import { SpacingTokens } from "../../theme/schema.types";

export type StyledDistributeDirection = 'column' | 'row';
export type Gap = keyof SpacingTokens;

export interface StyledDistributeBaseProps {
  $direction: StyledDistributeDirection;
  $gap: Gap;
};

export interface StyledDistributeProps extends PropsWithChildren {
  as?: Element;
  direction?: StyledDistributeDirection;
  gap?: Gap;
};
