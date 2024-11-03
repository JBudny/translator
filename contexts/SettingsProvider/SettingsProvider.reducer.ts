import {
  SettingsContextState,
  SettingsProviderAction
} from "./SettingsContext.types";

export const settingsProviderReducer = (
  state: SettingsContextState,
  action: SettingsProviderAction
): SettingsContextState => {
  const { type } = action;

  switch (type) {
    case 'keyRequiredSet':
      return { ...state, keyRequired: action.payload };
    case 'settingsErrorSet':
      return { ...state, error: action.payload };
    case 'settingsStatusSet':
      return { ...state, status: action.payload };
    case 'settingsErrorReset':
      return { ...state, error: undefined, status: 'idle' };

    default: {
      throw new Error(`Unhandled settingsProviderReducer action type: ${type}`)
    };
  };
};

export type SettingsProviderReducer = typeof settingsProviderReducer;
