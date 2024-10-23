import 'styled-components';
import { Font, Tokens, Palette } from './theme';
import { Animations } from './theme/schema.types';

declare module 'styled-components' {
	export interface DefaultTheme {
		animations: Animations;
		font: Font;
		name: ThemeName;
		palette: Palette;
		tokens: Tokens;
	};
};
