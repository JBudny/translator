import { StyledTextBaseProps } from "../shared";

export interface StyledTextProps extends StyledTextBaseProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
};
