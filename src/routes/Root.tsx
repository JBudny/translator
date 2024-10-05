import { FC, HTMLAttributes, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

export const Root: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const auth = useAuth();
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
