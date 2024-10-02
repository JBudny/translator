import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledAppWrapperBase = styled.div`
  padding: ${({ theme }) => theme.tokens.spacing3};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray700})`};
`;

export const StyledAppWrapper: FC<PropsWithChildren> = ({ children }) => {

  return (<StyledAppWrapperBase>{children}</StyledAppWrapperBase>);
}