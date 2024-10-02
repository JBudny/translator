import styled from "styled-components";
import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { StyledFormInputBaseProps, StyledFormProps, StyledStyledSelectBaseProps } from "./StyledForm.types";
import { StyledTypography } from '../../../components'
import { StyledFormElementCSS, StyledTileCSS, StyledTypographyBaseCSS, TileProps } from '../../../components/shared';

const StyledFormBase = styled.form<TileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing3};
  padding: ${({ theme }) => theme.tokens.spacing3};
  background-color: ${({ theme }) => `rgb(${theme.palette.gray500})`};
`;

const StyledFormContentBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing3};
`;

const StyledFormFieldBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing2};
`;

const StyledFormInputBase = styled.input<StyledFormInputBaseProps>`
  ${StyledFormElementCSS};
  ${StyledTypographyBaseCSS};
  padding: ${({ theme }) => theme.tokens.spacing2};
  border: none;
  border-radius: ${({ theme }) => theme.tokens.borderRadius1};
`;

const StyledSelectBase = styled.select<StyledStyledSelectBaseProps>`
  ${StyledFormElementCSS};
  ${StyledTypographyBaseCSS};
  padding: ${({ theme }) => theme.tokens.spacing2};
  border: none;
  border-radius: ${({ theme }) => theme.tokens.borderRadius1};
`;

const StyledFormFooterBase = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledForm: StyledFormProps = ({ children, ...props }) => (
  <StyledFormBase $variant="highlighted" {...props}>
    {children}
  </StyledFormBase>
);

const StyledFormHeader: StyledFormProps["Header"] = ({
  heading,
  ...props
}) => {
  return (
    <StyledTypography $size="medium" $weight="medium" as="span" {...props}>{heading}</StyledTypography>
  )
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
      <StyledTypography $size="medium" $weight="medium" as="span" $color="gray100">
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
    $variant="highlighted"
    {...props}
  >
    {children}
  </StyledSelectBase>
));

const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <StyledFormInputBase
    $size="small"
    $weight="normal"
    ref={ref}
    type={type}
    $variant="highlighted"
    {...props}
  />
));

StyledForm.Header = StyledFormHeader;
StyledForm.Content = StyledFormContent;
StyledForm.Footer = StyledFormFooter;
StyledForm.Field = StyledFormField;
StyledForm.Input = FormInput;
StyledForm.Select = StyledSelect;
