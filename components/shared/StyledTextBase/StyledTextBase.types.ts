import { PropsWithChildren } from "react";
import { OpacityTokens, Palette } from "../../../theme";

export type TextSize = 'small' | 'medium' | 'large';
export type TextWeight = 'normal' | 'medium';

export interface StyledTextBaseProps extends PropsWithChildren {
  $weight: TextWeight;
  $size: TextSize
  $color?: keyof Palette;
  $opacity?: keyof OpacityTokens;
  $align?: 'left' | 'right' | 'center';
};
