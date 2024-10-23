import { AsyncStatus } from "../../../types";
import { APIBaseURLFormSchema, ApiKeyFormSchema } from "../../forms";

export interface UserSettingsProviderState extends APIBaseURLFormSchema, ApiKeyFormSchema {
  status: AsyncStatus;
};

interface ApiBaseURLSetAction {
  type: 'apiBaseUrlSet';
  payload: { apiBaseURL: UserSettingsProviderState['apiBaseURL'] };
};

interface ApiKeySetAction {
  type: 'apiKeySet';
  payload: { apiKey: UserSettingsProviderState['apiKey'] };
};

interface StatusSetAction {
  type: 'statusSet';
  payload: { status: AsyncStatus };
};

export type UserSettingsProviderAction = ApiBaseURLSetAction | ApiKeySetAction | StatusSetAction;
export type UserSettingsProviderDispatch = (action: UserSettingsProviderAction) => void;
