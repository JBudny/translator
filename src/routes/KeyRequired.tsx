import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useSettings } from "../../contexts";

export const KeyRequired: FC<PropsWithChildren> = ({ children }) => {
  const [settings] = useSettings();

  const { data: settingsData } = settings;

  if (settingsData?.keyRequired === false)
    return <Navigate to="/languages" replace />;

  return <>{children}</>;
};
