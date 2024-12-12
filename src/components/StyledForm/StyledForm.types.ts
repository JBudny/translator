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
  Option: FC<OptionHTMLAttributes<HTMLOptionElement>>;
  Select: FC<SelectHTMLAttributes<HTMLSelectElement>>;
};

export interface StyledFormInputBaseProps extends StyledTextBaseProps { }

export interface StyledStyledSelectBaseProps extends StyledTextBaseProps { };
