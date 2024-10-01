import { FC, PropsWithChildren } from 'react';
import { StyledTypographyBase } from '../shared';
import { type StyledTypographyProps } from './StyledTypography.types';

export const StyledTypography: FC<PropsWithChildren<StyledTypographyProps>> =
  ({ children, ...props }) =>
    <StyledTypographyBase {...props}>{children}</StyledTypographyBase>
