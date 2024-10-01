
import { PropsWithChildren } from "react";
import { OpacityTokens, Palette } from "../../theme";

export type TypographySize = 'small' | 'medium' | 'large';
export type TypographyWeight = 'normal' | 'medium';

export interface StyledTypographyBaseProps extends PropsWithChildren {
  $weight: TypographyWeight;
  $size: TypographySize
  $color?: keyof Palette;
  $opacity?: keyof OpacityTokens;
  $align?: 'left' | 'right' | 'center';
};

export interface StyledTypographyProps extends StyledTypographyBaseProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
};
