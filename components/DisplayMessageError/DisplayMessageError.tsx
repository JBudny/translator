import { FC } from 'react';
import {
  StyledDistribute,
  StyledText,
  StyledBox,
  StyledJustify,
  StyledButton
} from '..'
import { DisplayMessageErrorProps } from './DisplayMessageError.types'

export const DisplayMessageError: FC<DisplayMessageErrorProps> = ({ error, onRetry }) => {

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2" $color="red500">
        Error!
      </StyledText>
      <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
        <StyledDistribute gap="spacing3">
          {error.cause ? (
            <StyledDistribute gap="spacing2">
              <StyledText $size="medium" $weight="normal" as="span" $color="gray100">
                Code
              </StyledText>
              <StyledText $size="medium" $weight="normal" as="span" $color="red500">
                {(error.cause).toString()}
              </StyledText>
            </StyledDistribute>
          ) : null}
          <StyledDistribute>
            <StyledText $size="medium" $weight="normal" as="span" $color="gray100">
              Message
            </StyledText>
            <StyledText $size="medium" $weight="normal" as="span" $color="red500">
              {error.message}
            </StyledText>
          </StyledDistribute>
        </StyledDistribute>
      </StyledBox>
      <StyledJustify justify="end">
        <StyledButton $appearance="transparent" onClick={onRetry} type="submit">
          <StyledText $size="medium" $weight="medium" as="span">Try Again</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};