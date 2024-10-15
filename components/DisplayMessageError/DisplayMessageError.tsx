import { FC } from 'react';
import {
  StyledDistribute,
  StyledTypography,
  StyledBox,
  StyledJustify,
  StyledButton
} from '..'
import { DisplayMessageErrorProps } from './DisplayMessageError.types'

export const DisplayMessageError: FC<DisplayMessageErrorProps> = ({ error, onRetry }) => {

  return (
    <StyledDistribute gap="spacing3">
      <StyledTypography $size="large" $weight="normal" as="h2" $color="red500">
        Error!
      </StyledTypography>
      <StyledBox padding="spacing2" background="gray500" rounding="borderRadius2">
        <StyledDistribute gap="spacing3">
          {error.cause ? (
            <StyledDistribute gap="spacing2">
              <StyledTypography $size="medium" $weight="normal" as="span" $color="gray100">
                Code
              </StyledTypography>
              <StyledTypography $size="medium" $weight="normal" as="span" $color="red500">
                {(error.cause).toString()}
              </StyledTypography>
            </StyledDistribute>
          ) : null}
          <StyledDistribute>
            <StyledTypography $size="medium" $weight="normal" as="span" $color="gray100">
              Message
            </StyledTypography>
            <StyledTypography $size="medium" $weight="normal" as="span" $color="red500">
              {error.message}
            </StyledTypography>
          </StyledDistribute>
        </StyledDistribute>
      </StyledBox>
      <StyledJustify justify="end">
        <StyledButton $appearance="transparent" onClick={onRetry} type="submit">
          <StyledTypography $size="medium" $weight="medium" as="span">Try Again</StyledTypography>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};