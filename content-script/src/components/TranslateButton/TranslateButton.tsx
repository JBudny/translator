import { FC } from "react";
import { TranslateButtonProps } from "./TranslateButton.types";;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBookOpenReader, faLanguage, faRobot } from "@fortawesome/free-solid-svg-icons";
import { StyledButton } from "../../../../components";
import { useTheme } from "styled-components";

export const TranslateButton: FC<TranslateButtonProps> = (props) => {
  const { palette: { gray100 } } = useTheme();

  return (
    <StyledButton {...props}>
      <FontAwesomeIcon icon={faBookOpen} height="1em" color={`rgb(${gray100})`} />
    </StyledButton>
  );
};