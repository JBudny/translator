import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledBox,
  StyledButton,
  StyledDistribute,
  StyledJustify,
} from "../../../../components";
import { ContentScriptLayoutProps } from "./ContentScriptLayout.types";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

export const ContentScriptLayout: FC<ContentScriptLayoutProps> = ({
  onClose,
  children,
}) => (
  <StyledBox
    background="gray700"
    padding="spacing3"
    style={{ transition: "all 230ms" }}
  >
    <StyledDistribute gap="spacing2">
      <StyledJustify justify="flex-start">
        <StyledButton onClick={onClose}>
          <FontAwesomeIcon icon={faClose} height="1em" />
        </StyledButton>
      </StyledJustify>
      {children}
    </StyledDistribute>
  </StyledBox>
);
