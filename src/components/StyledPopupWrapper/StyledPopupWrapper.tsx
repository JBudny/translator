import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const StyledPopupWrapperBase = styled.div`
  width: 375px;
`;

export const StyledPopupWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {

  return (<StyledPopupWrapperBase {...props}>{children}</StyledPopupWrapperBase>);
};
