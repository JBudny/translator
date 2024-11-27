import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer
} from "react";
import {
  StorageContextProps,
  StorageProviderAction
} from "./StorageProvider.types";
import { ExtensionStorage } from "../../src/extensionStorage.types";
import {
  StorageProviderReducer,
  storageProviderReducer
} from "./StorageProvider.reducer";
import { DisplayMessageError } from "../../components";
import {
  storageErrorReset,
  storageErrorSet,
  storageSet
} from './StorageProvider.actions';

export const StorageContext = createContext<StorageContextProps>({
  storageDispatch: () => { },
  state: {}
});

const getStorage = (dispatch: (action: StorageProviderAction) => void) => {
  chrome.storage.local.get<ExtensionStorage>(
    null,
    (storage) => {
      if (chrome.runtime.lastError) {
        dispatch(storageErrorSet(
          chrome.runtime.lastError.message ||
          `Unknown error while reading the storage. (StorageProvider)`
        ));

        return;
      };
      if (storage) {
        dispatch(storageSet(storage));
      };
    },
  );
};

export const StorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, storageDispatch] =
    useReducer<StorageProviderReducer>(storageProviderReducer, {})

  // listen for storage changes and sync the StorageProvider
  useEffect(() => {
    if (!chrome.storage) {
      storageDispatch(
        storageErrorSet(`Could not access the storage. (StorageProvider)`)
      );

      return;
    };

    // Get storage data initially
    getStorage(storageDispatch);

    const getStorageListener = () => getStorage(storageDispatch)
    // Set listener for storage data change event
    chrome.storage.onChanged.addListener(getStorageListener);

    return () => {
      chrome.storage.onChanged.removeListener(getStorageListener);
    };
  }, [state.error]);

  const onRetry = () => {
    storageDispatch(storageErrorReset);
  };

  if (state.error) return (
    <DisplayMessageError message={state.error} onRetry={onRetry} />
  );

  const value = { state, storageDispatch };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};
