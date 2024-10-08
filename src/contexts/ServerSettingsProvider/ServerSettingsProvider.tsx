import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { ServerSettingsProviderAction, ServerSettingsProviderDispatch, ServerSettingsProviderState } from "./ServerSettingsProvider.types";
import { serverSettingsReducer } from "./ServerSettingsProvider.reducer";
import { ExtensionStorage } from "../../extensionStorage.types";

export const ServerSettingsContext = createContext<{
  state: ServerSettingsProviderState;
  dispatch: ServerSettingsProviderDispatch;
} | null>(null);

export const ServerSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<typeof serverSettingsReducer>(serverSettingsReducer,
    { keyRequired: false }
  );

  useEffect(() => {
    const getServerSettings = () => {
      chrome.storage.local.get<ExtensionStorage>(["keyRequired"], ({ keyRequired }) => {
        const action: ServerSettingsProviderAction = {
          type: "keyRequiredSet",
          payload: { keyRequired }
        };
        dispatch(action);
      });
    };

    // Get server settings initially
    getServerSettings();
    // Set listener for the server settings change events
    chrome.storage.onChanged.addListener(getServerSettings);

    return () => {
      chrome.storage.onChanged.removeListener(getServerSettings);
    }
  }, []);

  const value = { state, dispatch };

  return (
    <ServerSettingsContext.Provider value={value}>
      {children}
    </ServerSettingsContext.Provider>
  );
};
