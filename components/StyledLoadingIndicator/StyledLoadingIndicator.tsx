import { FC } from "react";
import {
  StyledBox,
  StyledJustify,
  StyledDistribute,
  StyledAlign,
  StyledAnimation,
  StyledText
} from '../../components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StyledLoadingIndicatorProps } from "./StyledLoadingIndicator.types";
import { useTheme } from "styled-components";

export const StyledLoadingIndicator: FC<StyledLoadingIndicatorProps> = ({ title }) => {
  const { palette: { gray100 } } = useTheme();

  return (
    <StyledJustify justify="center">
      <StyledDistribute gap="spacing2" direction="row">
        <StyledAlign align="center">
          <StyledAnimation animation="rotate" duration="2s">
            <FontAwesomeIcon icon={faSpinner} height="1em" color={`rgb(${gray100})`} />
          </StyledAnimation>
        </StyledAlign>
        <StyledText $size="medium" $weight="medium" as="span">
          {title}
        </StyledText>
      </StyledDistribute>
    </StyledJustify>
  );
};