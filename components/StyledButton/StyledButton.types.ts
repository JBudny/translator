import { ButtonHTMLAttributes } from "react";

export interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $appearance?: 'transparent' | 'filled';
};
