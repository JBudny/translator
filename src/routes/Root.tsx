import { FC, HTMLAttributes, useEffect } from "react";
import { useUserSettings } from "../UserSettingsProvider";
import { useNavigate } from "react-router-dom";

/**
 * Navigation logic here is used to redirect to the first empty step of the
 * multi step form after it was closed and opened again.
 */
export const Root: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const auth = useUserSettings();
  const navigation = useNavigate();

  if (!auth) return null;

  const { state: { apiBaseURL, apiKey } } = auth;

  useEffect(() => {
    if (apiBaseURL) navigation("apikey");
  }, [apiBaseURL]);

  useEffect(() => {
    if (apiKey) navigation("languages");
  }, [apiKey]);

  return <>{children}</>
};
