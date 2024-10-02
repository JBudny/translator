import { Schema } from './schema.types';

export const schema: Schema = {
  dark: {
    font: {
      size: {
        large: '1.5rem',
        medium: '1.2rem',
        small: '1rem',
      },
      weight: {
        medium: '600',
        normal: '500',
      },
    },
    name: 'dark',
    palette: {
      gray100: '214, 216, 219',
      gray300: '073, 078, 084',
      gray500: '031, 034, 038',
      gray700: '015, 016, 019',
      green500: '122, 199, 79',
      red500: '242, 67, 51',
      teal500: '35, 150, 127',
      yellow500: '234, 144, 16',
    },
    tokens: {
      borderRadius1: '5px',
      borderRadius2: '10px',
      opacity1: 1,
      opacity2: 0.15,
      opacity3: 0.1,
      spacing1: '5px',
      spacing2: '10px',
      spacing3: '15px',
      touchableSize: '40px',
    },
  }
};
