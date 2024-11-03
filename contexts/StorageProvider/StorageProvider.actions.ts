import { ExtensionStorage } from '../../src/extensionStorage.types';
import {
  StorageErrorResetAction,
  StorageErrorSetAction,
  StorageSetAction
} from './StorageProvider.types';

export const storageErrorSet = (message: string): StorageErrorSetAction => ({
  payload: message,
  type: 'storageErrorSet',
});

export const storageSet = (storage: ExtensionStorage): StorageSetAction => ({
  type: "storageSet",
  payload: storage,
})

export const storageErrorReset: StorageErrorResetAction = ({
  type: 'storageErrorReset'
});
