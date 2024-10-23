import { DefaultTheme } from 'styled-components';
import { Keyframes } from 'styled-components/dist/types';

export interface Animations {
  rotate: Keyframes;
};

export interface BorderTokens {
  borderRadius1: string;
  borderRadius2: string;
};

export interface Font {
  size: {
    small: string;
    medium: string;
    large: string;
  };
  weight: {
    normal: string;
    medium: string;
  };
};

export interface OpacityTokens {
  opacity1: number;
  opacity2: number;
  opacity3: number;
};

export interface Palette {
  gray100: string,
  gray300: string,
  gray500: string,
  gray700: string,
  green500: string,
  red500: string,
  teal500: string,
  yellow500: string,
  transparent: string,
};

export interface SpacingTokens {
  spacing1: string;
  spacing2: string;
  spacing3: string;
};

export type ThemeName = 'dark';

export interface Tokens extends
  OpacityTokens,
  SpacingTokens,
  BorderTokens {
  touchableSize: string;
};

interface Theme extends DefaultTheme {
  name: ThemeName;
  tokens: Tokens;
  font: Font;
  animations: Animations;
};

export interface Schema {
  dark: Theme;
};
