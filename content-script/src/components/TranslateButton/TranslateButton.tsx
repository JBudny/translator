import { FC } from "react";
import { TranslateButtonProps } from "./TranslateButton.types";

export const TranslateButton: FC<TranslateButtonProps> = (props) => {
  return (
    <button
      {...props}
    >
      Translate
    </button>
  );
};