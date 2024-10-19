import { FC, PropsWithChildren } from 'react';
import { StyledTextBase } from '../shared';
import { type StyledTextProps } from './StyledText.types';

export const StyledText: FC<PropsWithChildren<StyledTextProps>> =
  ({ children, ...props }) =>
    <StyledTextBase {...props}>{children}</StyledTextBase>
