import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const StyledAppHeaderBase = styled.div`
  padding: ${({ theme }) => theme.tokens.spacing3};
  background-color: ${({ theme }) => `rgb(${theme.palette.teal500})`};
`;

export const StyledAppHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <StyledAppHeaderBase {...props}>{children}</StyledAppHeaderBase>
}
