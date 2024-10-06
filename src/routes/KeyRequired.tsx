import { FC, PropsWithChildren } from "react";
import { useServerSettings } from "../ServerSettingsProvider";
import { Navigate } from "react-router-dom";

export const KeyRequired: FC<PropsWithChildren> = ({ children }) => {
  const serverSettings = useServerSettings();

  if (!serverSettings) {
    return <Navigate to="/" replace />
  }

  if (serverSettings.state.keyRequired === false) {
    return <Navigate to="/languages" replace />;
  };

  return (<>{children}</>);
};
