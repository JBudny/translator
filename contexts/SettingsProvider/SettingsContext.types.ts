import { AsyncStatus } from "../../types";

export interface SettingsKeyRequiredSetAction {
  type: 'keyRequiredSet';
  payload: boolean;
};

export interface SettingsErrorSetAction {
  type: 'settingsErrorSet';
  payload: string;
};

export interface SettingsStatusSetAction {
  type: 'settingsStatusSet';
  payload: AsyncStatus;
};

export interface SettingsErrorResetAction {
  type: 'settingsErrorReset';
};

export type SettingsProviderAction =
  SettingsKeyRequiredSetAction |
  SettingsErrorSetAction |
  SettingsErrorResetAction |
  SettingsStatusSetAction;

export interface SettingsContextState {
  keyRequired?: boolean;
  error?: string;
  status: AsyncStatus;
};

export interface SettingsContextProps {
  state: SettingsContextState;
  settingsDispatch: (action: SettingsProviderAction) => void;
};
