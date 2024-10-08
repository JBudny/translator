import { ApiKeyFormSchema, APIBaseURLFormSchema } from "../forms";

export interface UserSettingsProviderState extends APIBaseURLFormSchema, ApiKeyFormSchema { };

interface ApiBaseURLSetAction {
  type: 'apiBaseUrlSet';
  payload: { apiBaseURL: UserSettingsProviderState['apiBaseURL'] };
};

interface ApiKeySetAction {
  type: 'apiKeySet';
  payload: { apiKey: UserSettingsProviderState['apiKey'] };
};

export type UserSettingsProviderAction = ApiBaseURLSetAction | ApiKeySetAction;
export type UserSettingsProviderDispatch = (action: UserSettingsProviderAction) => void;
