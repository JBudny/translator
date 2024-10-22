import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledAlign, StyledButton, StyledDistribute, StyledJustify, StyledText } from "../../../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
        <StyledDistribute direction="row">
          <StyledAlign align="center">
            <FontAwesomeIcon icon={faChevronLeft} />
          </StyledAlign>
          <StyledText $size="medium" $weight="medium" as="span">
            back
          </StyledText>
        </StyledDistribute>
      </StyledButton>
    </BackButtonBase>
  );
};