import { ExtensionStorage } from "../../src/extensionStorage.types";

export interface StorageErrorSetAction {
  type: 'storageErrorSet';
  payload: string;
};

export interface StorageSetAction {
  type: 'storageSet';
  payload: ExtensionStorage;
};

export interface StorageErrorResetAction {
  type: 'storageErrorReset';
};

export type StorageProviderAction =
  StorageErrorResetAction |
  StorageErrorSetAction |
  StorageSetAction;

export interface StorageContextState extends ExtensionStorage {
  error?: string;
};

export interface StorageContextProps {
  state: StorageContextState;
  storageDispatch: (action: StorageProviderAction) => void;
};
