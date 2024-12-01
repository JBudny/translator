import { FC, useEffect } from "react";
import { ContentScriptDisplayMessageErrorProps } from "./ContentScriptDisplayMessageError.types";
import { ContentScriptLayout } from "../ContentScriptLayout";
import { DisplayMessageError } from "../../../../components";

export const ContentScriptDisplayMessageError: FC<
  ContentScriptDisplayMessageErrorProps
> = ({ error, onClose, resetErrorBoundary, contentUpdateCallback }) => {
  const handleClose = () => {
    resetErrorBoundary();
    onClose();
  };

  useEffect(() => {
    if (contentUpdateCallback) contentUpdateCallback();
  }, []);

  return (
    <ContentScriptLayout onClose={handleClose}>
      <DisplayMessageError
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </ContentScriptLayout>
  );
};
