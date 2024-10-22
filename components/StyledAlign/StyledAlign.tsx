import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type Align = 'center' | 'flex-end' | 'flex-start';

interface StyledJustifyBaseProps {
  $align: Align;
};

interface StyledAlignProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  align: Align;
};

const StyledAlignBase = styled.div<StyledJustifyBaseProps>`
  display: flex;
  align-items: ${({ $align }) => $align};
`;

export const StyledAlign: FC<StyledAlignProps> = ({ children, align, ...props }) => {

  return (
    <StyledAlignBase $align={align} {...props}>{children}</StyledAlignBase>
  );
};
