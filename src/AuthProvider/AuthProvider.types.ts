import { ApiKeyFormSchema, APIBaseURLFormSchema } from "../Forms";

export interface AuthProviderState extends APIBaseURLFormSchema, ApiKeyFormSchema { };

interface ApiBaseURLSetAction {
  type: 'apiBaseUrlSet';
  payload: { apiBaseURL: AuthProviderState['apiBaseURL'] };
};

interface ApiKeySetAction {
  type: 'apiKeySet';
  payload: { apiKey: AuthProviderState['apiKey'] };
};

export type Action = ApiBaseURLSetAction | ApiKeySetAction;
export type Dispatch = (action: Action) => void;
