import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type Justify = 'start' | 'end' | 'center' | 'between' | 'around';

interface StyledJustifyBaseProps {
  $justify: Justify;
};

interface StyledJustifyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  justify: Justify;
};

const justifyMap = new Map([
  ['start', 'flex-start'],
  ['end', 'flex-end'],
  ['center', 'center'],
  ['between', 'space-between'],
  ['around', 'space-around'],
]);

const StyledJustifyBase = styled.div<StyledJustifyBaseProps>`
  display: flex;
  justify-content: ${({ $justify }) => justifyMap.get($justify)};
`;

export const StyledJustify: FC<StyledJustifyProps> = ({ children, justify, ...props }) => {

  return (
    <StyledJustifyBase $justify={justify} {...props}>{children}</StyledJustifyBase>
  );
};
