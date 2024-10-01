import { FC, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { StyledFormElementCSSProps, StyledTypographyBaseProps } from "../../../components/shared";

export interface StyledFormProps
  extends FC<FormHTMLAttributes<HTMLFormElement>> {
  Header: FC<HTMLAttributes<HTMLDivElement> & { heading: string }>;
  Content: FC<HTMLAttributes<HTMLDivElement>>;
  Footer: FC<HTMLAttributes<HTMLDivElement>>;
  Field: FC<
    HTMLAttributes<HTMLDivElement> & {
      htmlFor: string
      label: string
      error: FieldError | undefined
    }
  >;
  Input: FC<InputHTMLAttributes<HTMLInputElement>>;
  Select: FC<SelectHTMLAttributes<HTMLSelectElement>>;
};

export interface StyledFormInputBaseProps extends StyledFormElementCSSProps, StyledTypographyBaseProps { }

export interface StyledStyledSelectBaseProps extends StyledFormElementCSSProps, StyledTypographyBaseProps { };
