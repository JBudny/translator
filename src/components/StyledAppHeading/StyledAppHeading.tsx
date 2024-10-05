import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { StyledTypography } from "../../../components";

const StyledAppHeadingBase = styled.div`
  padding: ${({ theme }) => theme.tokens.spacing2};
`;

export const StyledAppHeading: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledAppHeadingBase>
      <StyledTypography $size="medium" $weight="medium" as="h1" >{children}</StyledTypography>
    </StyledAppHeadingBase>
  );
};