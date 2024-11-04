import { FC, HTMLAttributes, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../../contexts";

/**
 * Navigation logic here is used to redirect to the first empty step of the
 * multi step form after it was closed and opened again.
 */
export const Root: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const storage = useStorage();
  const navigation = useNavigate();

  if (!storage) return null;

  const { state: { apiBaseURL, apiKey } } = storage;

  useEffect(() => {
    if (apiBaseURL) navigation("apikey");
  }, [apiBaseURL]);

  useEffect(() => {
    if (apiKey) navigation("languages");
  }, [apiKey]);

  return <>{children}</>
};
