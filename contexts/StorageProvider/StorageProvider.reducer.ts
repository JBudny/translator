import {
  StorageContextState,
  StorageProviderAction
} from "./StorageProvider.types";

export const storageProviderReducer = (
  state: StorageContextState,
  action: StorageProviderAction
): StorageContextState => {
  const { type } = action;

  switch (type) {
    case 'storageSet':
      return { ...state, ...action.payload };
    case 'storageErrorSet':
      return { ...state, error: action.payload };
    case 'storageErrorReset':
      return { ...state, error: undefined };

    default: {
      throw new Error(`Unhandled storageProviderReducer action type: ${type}`)
    };
  };
};

export type StorageProviderReducer = typeof storageProviderReducer;