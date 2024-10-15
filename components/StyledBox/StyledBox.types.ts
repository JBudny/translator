import { HTMLAttributes, PropsWithChildren } from "react"
import { Palette, SpacingTokens, BorderTokens } from "../../theme/schema.types"

type Spacing = keyof SpacingTokens | 'none';
type Background = keyof Palette | 'none';
type Rounding = keyof BorderTokens | 'none';

export interface StyledBoxBaseProps {
  $padding: Spacing;
  $background: Background;
  $rounding: Rounding;
};

export interface StyledBoxProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  padding?: Spacing;
  background?: Background;
  rounding?: Rounding;
};
