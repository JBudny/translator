export interface ServerSettingsProviderState {
  keyRequired?: boolean;
};

interface KeyRequiredSetAction {
  type: 'keyRequiredSet';
  payload: { keyRequired: ServerSettingsProviderState['keyRequired'] }
};

export type ServerSettingsProviderAction = KeyRequiredSetAction;

export type ServerSettingsProviderDispatch = (action: ServerSettingsProviderAction) => void;