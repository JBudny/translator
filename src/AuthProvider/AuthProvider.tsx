import { createContext, FC, PropsWithChildren, ReducerWithoutAction, useEffect, useReducer, useState } from "react";
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
    const authListener = () => {
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
    chrome.storage.onChanged.addListener(authListener);
    return () => {
      chrome.storage.onChanged.removeListener(authListener);
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get<ExtensionStorage>()
      .then(({ apiBaseURL, apiKey }) => {
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
  }, []);

  const value = { state, dispatch }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
