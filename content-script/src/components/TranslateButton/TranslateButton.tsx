import { FC } from "react";
import { TranslateButtonProps } from "./TranslateButton.types";
import { StyledButton } from "../../../../components";

export const TranslateButton: FC<TranslateButtonProps> = (props) => {
  return (
    <StyledButton
      {...props}
    >
      Translate
    </StyledButton>
  );
};