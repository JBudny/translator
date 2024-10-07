import styled from "styled-components";
import { FC, forwardRef, InputHTMLAttributes, OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import { StyledFormInputBaseProps, StyledFormProps, StyledStyledSelectBaseProps } from "./StyledForm.types";
import { StyledTypography } from '../../../components'
import { StyledTypographyBaseCSS } from '../../../components/shared';

const StyledFormBase = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing3};
  padding: ${({ theme }) => theme.tokens.spacing3};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray700})`};
`;

const StyledFormContentBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing2};
`;

const StyledFormFieldBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing2};
  padding: ${({ theme }) => theme.tokens.spacing2};
  border-radius: ${({ theme }) => theme.tokens.borderRadius2};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray500})`} ;
`;

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

const StyledFormFooterBase = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledOptionBase = styled.option`
    color: ${({ theme }) => `rgb(${theme.palette.gray700})`};
`;

export const StyledForm: StyledFormProps = ({ children, ...props }) => (
  <StyledFormBase {...props}>
    {children}
  </StyledFormBase>
);

const StyledFormHeader: StyledFormProps["Header"] = ({
  $size,
  $weight,
  as,
  children,
  ...props
}) => {
  return (
    <StyledTypography $size={$size} $weight={$weight} as={as} {...props}>{children}</StyledTypography>
  );
};

const StyledFormContent: StyledFormProps["Content"] = ({ children, ...props }) => (
  <StyledFormContentBase {...props}>
    {children}
  </StyledFormContentBase>
);

const StyledFormFooter: StyledFormProps["Footer"] = ({ children, ...props }) => (
  <StyledFormFooterBase {...props}>{children}</StyledFormFooterBase>
);

const StyledFormField: StyledFormProps["Field"] = ({
  children,
  htmlFor,
  label,
  error,
  ...props
}) => (
  <StyledFormFieldBase {...props}>
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
  </StyledFormFieldBase>
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

StyledForm.Header = StyledFormHeader;
StyledForm.Content = StyledFormContent;
StyledForm.Footer = StyledFormFooter;
StyledForm.Field = StyledFormField;
StyledForm.Input = FormInput;
StyledForm.Select = StyledSelect;
StyledForm.Option = StyledOption;
