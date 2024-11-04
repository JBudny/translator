import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useSettings } from "../../contexts";

export const KeyRequired: FC<PropsWithChildren> = ({ children }) => {
  const settings = useSettings();

  if (!settings) {
    return <Navigate to="/" replace />
  }

  if (settings.state.keyRequired === false) {
    return <Navigate to="/languages" replace />;
  };

  return (<>{children}</>);
};
