import {
  FC,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes
} from "react";
import { FieldError } from "react-hook-form";
import { StyledTextBaseProps } from "../../../components/shared";
import { StyledDistributeProps } from "../../../components";

export interface StyledFormProps
  extends FC<FormHTMLAttributes<HTMLFormElement>>, StyledDistributeProps {
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

export interface StyledFormInputBaseProps extends StyledTextBaseProps { }

export interface StyledStyledSelectBaseProps extends StyledTextBaseProps { };
