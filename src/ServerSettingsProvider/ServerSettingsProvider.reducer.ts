import { ServerSettingsProviderAction, ServerSettingsProviderState } from "./ServerSettingsProvider.types";

export const serverSettingsReducer = (
  state: ServerSettingsProviderState,
  { type, payload }: ServerSettingsProviderAction) => {
  switch (type) {
    case "keyRequiredSet":
      return ({ ...state, keyRequired: payload.keyRequired });

    default:
      throw new Error(`Unhandler ServerSettingsReducer action type: ${type}`);
  };
};
