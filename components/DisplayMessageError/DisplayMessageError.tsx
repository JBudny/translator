import { FC } from 'react';
import {
  StyledDistribute,
  StyledText,
  StyledBox,
  StyledJustify,
  StyledButton
} from '..'
import { DisplayMessageErrorProps } from './DisplayMessageError.types'

export const DisplayMessageError: FC<DisplayMessageErrorProps> = ({ message, onRetry, onReset }) => {

  return (
    <StyledDistribute gap="spacing2">
      <StyledText $size="large" $weight="normal" as="h2" $color="red500">
        Error!
      </StyledText>
      <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
        <StyledDistribute gap="spacing2">
          <StyledDistribute gap="spacing1">
            <StyledText $size="medium" $weight="normal" as="span" $color="gray100">
              Message
            </StyledText>
            <StyledText $size="medium" $weight="normal" as="span" $color="red500">
              {message}
            </StyledText>
          </StyledDistribute>
        </StyledDistribute>
      </StyledBox>
      <StyledJustify justify={onReset ? "space-between" : "flex-end"}>
        {onReset ? (
          <StyledButton $appearance="transparent" onClick={onReset} type="submit">
            <StyledText $size="medium" $weight="medium" as="span">Reset error</StyledText>
          </StyledButton>
        ) : null}
        <StyledButton $appearance="transparent" onClick={onRetry} type="submit">
          <StyledText $size="medium" $weight="medium" as="span">Try Again</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};