import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const StyledAppHeaderBase = styled.div`
  position: relative;
  display: flex;
  padding: ${({ theme }) => theme.tokens.spacing1};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `rgb(${theme.palette.teal500})`};
`;

export const StyledAppHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <StyledAppHeaderBase {...props}>{children}</StyledAppHeaderBase>;
};
