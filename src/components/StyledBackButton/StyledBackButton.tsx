import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledButton, StyledTypography } from "../../../components";
import styled from "styled-components";

const BackButtonBase = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
`;

export const StyledBackButton: FC = () => {
  const { key } = useLocation();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  if (key === 'default') return null;

  return (
    <BackButtonBase>
      <StyledButton onClick={goBack} $appearance="transparent">
        <StyledTypography $size="medium" $weight="medium" as="span">{"< back"}</StyledTypography>
      </StyledButton>
    </BackButtonBase>
  );
};