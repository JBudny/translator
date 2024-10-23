import { UserSettingsProviderAction, UserSettingsProviderState } from "./UserSettingsProvider.types";

export const userSettingsReducer = (
  state: UserSettingsProviderState,
  { type, payload }: UserSettingsProviderAction): UserSettingsProviderState => {
  switch (type) {
    case "apiBaseUrlSet":
      return ({ ...state, apiBaseURL: payload.apiBaseURL });
    case "apiKeySet":
      return ({ ...state, apiKey: payload.apiKey });
    case "statusSet":
      return ({ ...state, status: payload.status });

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    };
  };
};
