import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { StyledDistribute } from "../StyledDistribute";
import { StyledText } from "../StyledText";
import { StyledBox } from "../StyledBox";
import { StyledJustify } from "../StyledJustify";
import { StyledButton } from "../StyledButton";

export const DisplayMessageError: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const message = error instanceof Error ? error.message : "Unknown error.";

  return (
    <StyledDistribute gap="spacing2">
      <StyledText $size="large" $weight="normal" as="h2" $color="red500">
        Error!
      </StyledText>
      <StyledBox
        padding="spacing2"
        background="gray500"
        rounding="borderRadius2"
      >
        <StyledDistribute gap="spacing2">
          <StyledDistribute gap="spacing1">
            <StyledText
              $size="medium"
              $weight="normal"
              as="span"
              $color="gray100"
            >
              Message
            </StyledText>
            <StyledText
              $size="medium"
              $weight="normal"
              as="span"
              $color="red500"
            >
              {message}
            </StyledText>
          </StyledDistribute>
        </StyledDistribute>
      </StyledBox>
      <StyledJustify justify="flex-end">
        <StyledButton
          $appearance="transparent"
          onClick={resetErrorBoundary}
          type="submit"
        >
          <StyledText $size="medium" $weight="medium" as="span">
            Reset error
          </StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
