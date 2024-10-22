import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type Justify = 'space-around' | 'space-between' | 'center' | 'flex-end' | 'flex-start';

interface StyledJustifyBaseProps {
  $justify: Justify;
};

interface StyledJustifyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  justify: Justify;
};

const StyledJustifyBase = styled.div<StyledJustifyBaseProps>`
  display: flex;
  justify-content: ${({ $justify }) => $justify};
`;

export const StyledJustify: FC<StyledJustifyProps> = ({ children, justify, ...props }) => {

  return (
    <StyledJustifyBase $justify={justify} {...props}>{children}</StyledJustifyBase>
  );
};
