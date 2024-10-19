import { Schema } from './schema.types';

export const schema: Schema = {
  dark: {
    font: {
      size: {
        large: '1.5em',
        medium: '1.2em',
        small: '1em',
      },
      weight: {
        medium: '600',
        normal: '500',
      },
    },
    name: 'dark',
    palette: {
      gray100: '255, 255, 255',
      gray300: '182, 182, 182',
      gray500: '040, 043, 047',
      gray700: '031, 034, 038',
      green500: '128, 201, 084',
      red500: '252, 156, 156',
      teal500: '047, 204, 172',
      yellow500: '242, 167, 060',
      transparent: 'transparent',
    },
    tokens: {
      borderRadius1: '5px',
      borderRadius2: '10px',
      opacity1: 1,
      opacity2: 0.35,
      opacity3: 0.1,
      spacing1: '5px',
      spacing2: '10px',
      spacing3: '15px',
      touchableSize: '40px',
    },
  },
};
