import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { UserSettingsProviderAction, UserSettingsProviderState, UserSettingsProviderDispatch } from "./UserSettingsProvider.types";
import { userSettingsReducer } from "./UserSettingsProvider.reducer";
import { ExtensionStorage } from "../../extensionStorage.types";
import { sendMessage } from "../../../service-worker";
import { API_ENDPOINTS, ServerSettingsResponse } from "../../../api";

export const UserSettingsContext = createContext<{
  state: UserSettingsProviderState;
  dispatch: UserSettingsProviderDispatch
} | null>(null);

export const UserSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<typeof userSettingsReducer>(userSettingsReducer,
    { apiBaseURL: "", apiKey: "" }
  );

  useEffect(() => {
    const getUserSettings = () => {
      chrome.storage.local.get<ExtensionStorage>(
        ["apiBaseURL", "apiKey"], ({ apiBaseURL, apiKey }) => {
          if (apiBaseURL) {
            const action: UserSettingsProviderAction = {
              type: "apiBaseUrlSet",
              payload: { apiBaseURL }
            };
            dispatch(action);
          };
          if (apiKey) {
            const action: UserSettingsProviderAction = {
              type: "apiKeySet",
              payload: { apiKey }
            };
            dispatch(action);
          };
        });
    };
    // Get user settings data initially
    getUserSettings();
    // Set listener for user settings data change events
    chrome.storage.onChanged.addListener(getUserSettings);

    return () => {
      chrome.storage.onChanged.removeListener(getUserSettings);
    };
  }, []);

  useEffect(() => {
    const fetchServerSettings = () => {
      sendMessage<{}, ServerSettingsResponse>({ type: API_ENDPOINTS.GET_SERVER_SETTINGS })
        .then((response) => {
          if (!response.success) {
            chrome.storage.local.remove<ExtensionStorage>("keyRequired");

            return;
          }
          const { data: { keyRequired } } = response;
          chrome.storage.local.set<ExtensionStorage>({ keyRequired })
        })
        .catch(() => {
          chrome.storage.local.remove<ExtensionStorage>("keyRequired");
        });
    };

    if (state.apiBaseURL) fetchServerSettings();
  }, [state.apiBaseURL]);

  const value = { state, dispatch }

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  )
}
