import {
  createContext,
  FC,
  PropsWithChildren,
  useReducer
} from "react";
import {
  SettingsContextProps,
  SettingsProviderAction
} from "./SettingsContext.types";
import {
  settingsProviderReducer,
  SettingsProviderReducer
} from "./SettingsProvider.reducer";
import { ServerSettingsResponse } from "../../api";
import {
  sendMessage,
  serverSettingsAction,
  ServerSettingsActionPayload
} from "../../service-worker";
import {
  keyRequiredSet,
  settingsErrorSet,
  settingsStatusSet
} from './SettingsProvider.actions';

export const getServerSettings = async (
  dispatch: (action: SettingsProviderAction) => void,
  onSuccess?: () => void,
) => {
  dispatch(settingsStatusSet('pending'));
  return sendMessage<ServerSettingsActionPayload, ServerSettingsResponse>(
    serverSettingsAction()
  )
    .then((response) => {
      if (!response.success) {
        dispatch(settingsErrorSet(response.error.message));
        dispatch(settingsStatusSet('fail'));

        return;
      };
      dispatch(keyRequiredSet(response.data.keyRequired));
      if (onSuccess) onSuccess();
      dispatch(settingsStatusSet('idle'));
    })
    .catch((error) => {
      dispatch(settingsErrorSet(
        'Unknown error while fetching settings. (SettingsProvider)'
      ));
      dispatch(settingsStatusSet('fail'));
    })
};

export const SettingsContext = createContext<SettingsContextProps>({
  settingsDispatch: () => { },
  state: { status: 'idle' }
});

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, settingsDispatch] =
    useReducer<SettingsProviderReducer>(settingsProviderReducer, {
      keyRequired: undefined,
      status: 'idle',
    });

  const value = { state, settingsDispatch };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
