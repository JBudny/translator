import styled from "styled-components";
import {
  FC,
  forwardRef,
  InputHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes
} from "react";
import {
  StyledFormInputBaseProps,
  StyledFormProps,
  StyledStyledSelectBaseProps
} from "./StyledForm.types";
import {
  StyledBox,
  StyledDistribute,
  StyledDistributeBase,
  StyledTypography
} from '../../../components'
import { StyledTypographyBaseCSS } from '../../../components/shared';

const StyledFormInputBase = styled.input<StyledFormInputBaseProps>`
  ${StyledTypographyBaseCSS};
  padding: ${({ theme }) => theme.tokens.spacing2};
  background-color: ${({ theme }) => theme.palette.transparent};
  border: none;
  border-bottom: ${({ theme }) => `1px solid rgb(${theme.palette.gray100})`};

  &::placeholder {
    color: ${({ theme }) => `rgb(${theme.palette.gray300})`}; 
  };
`;

const StyledSelectBase = styled.select<StyledStyledSelectBaseProps>`
  ${StyledTypographyBaseCSS};
  padding: ${({ theme }) => theme.tokens.spacing2};
  background-color: ${({ theme }) => theme.palette.transparent};
  border: none;
  border-bottom: ${({ theme }) => `1px solid rgb(${theme.palette.gray100})`};
  cursor: pointer;
`;

const StyledOptionBase = styled.option`
  color: ${({ theme }) => `rgb(${theme.palette.gray700})`};
`;

export const StyledForm: StyledFormProps = ({ children, ...props }) => {

  return (
    <StyledDistributeBase as='form' $direction="column" $gap="spacing3" {...props}>
      {children}
    </StyledDistributeBase>
  );
};

const StyledFormField: StyledFormProps["Field"] = ({
  children,
  htmlFor,
  label,
  error,
  ...props
}) => (
  <StyledBox background="gray500" padding="spacing2" rounding="borderRadius2" {...props}>
    <StyledDistribute gap="spacing2">
      <label htmlFor={htmlFor}>
        <StyledTypography $size="medium" $weight="normal" as="span" $color="gray100">
          {label}
        </StyledTypography>
      </label>
      {children}
      {error?.message && (
        <StyledTypography $size="medium" $weight="normal" as="span" $color="red500">
          {error.message}
        </StyledTypography>
      )}
    </StyledDistribute>
  </StyledBox>
);

const StyledSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ children, ...props }, ref) => (
  <StyledSelectBase
    $size="small"
    $weight="normal"
    ref={ref}
    {...props}
  >
    {children}
  </StyledSelectBase>
));

const StyledOption: FC<OptionHTMLAttributes<HTMLOptionElement>> = ({ children, ...props }) => {
  return (<StyledOptionBase {...props}>{children}</StyledOptionBase>);
};

const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <StyledFormInputBase
    $size="small"
    $weight="normal"
    ref={ref}
    type={type}
    {...props}
  />
));

StyledForm.Field = StyledFormField;
StyledForm.Input = FormInput;
StyledForm.Select = StyledSelect;
StyledForm.Option = StyledOption;
