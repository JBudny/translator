import 'styled-components';
import { Font, Tokens, Palette } from './theme';

declare module 'styled-components' {
	export interface DefaultTheme {
		font: Font;
		name: ThemeName;
		palette: Palette;
		tokens: Tokens;
	};
};
