import { Action, AuthProviderState } from "./AuthProvider.types";

export const authReducer = (state: AuthProviderState, { type, payload }: Action): AuthProviderState => {
  switch (type) {
    case "apiBaseUrlSet":
      return ({ ...state, apiBaseURL: payload.apiBaseURL });
    case "apiKeySet":
      return ({ ...state, apiKey: payload.apiKey });

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    };
  };
};
