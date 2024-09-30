import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Action, AuthProviderState, Dispatch } from "./AuthProvider.types";
import { authReducer } from "./AuthProvider.reducer";
import { ExtensionStorage } from "../extensionStorage.types";

export const AuthContext = createContext<
  { state: AuthProviderState; dispatch: Dispatch } | null
>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<typeof authReducer>(authReducer,
    { apiBaseURL: "", apiKey: "" }
  );

  useEffect(() => {
    const getAuth = () => {
      chrome.storage.local.get<ExtensionStorage>(
        ["apiBaseURL", "apiKey"], ({ apiBaseURL, apiKey }) => {
          if (apiBaseURL) {
            const action: Action = {
              type: "apiBaseUrlSet",
              payload: { apiBaseURL }
            };
            dispatch(action);
          };
          if (apiKey) {
            const action: Action = {
              type: "apiKeySet",
              payload: { apiKey }
            };
            dispatch(action);
          };
        });
    };
    // Get auth data initially
    getAuth();
    // Set auth data listener for auth data change events
    chrome.storage.onChanged.addListener(getAuth);

    return () => {
      chrome.storage.onChanged.removeListener(getAuth);
    };
  }, []);

  const value = { state, dispatch }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
