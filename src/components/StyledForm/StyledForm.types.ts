import { FC, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { StyledTypographyBaseProps } from "../../../components/shared";
import { StyledTypographyProps } from "../../../components";

export interface StyledFormProps
  extends FC<FormHTMLAttributes<HTMLFormElement>> {
  Header: FC<HTMLAttributes<HTMLDivElement> & StyledTypographyProps>;
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
  Option: FC<OptionHTMLAttributes<HTMLOptionElement>>;
};

export interface StyledFormInputBaseProps extends StyledTypographyBaseProps { }

export interface StyledStyledSelectBaseProps extends StyledTypographyBaseProps { };
