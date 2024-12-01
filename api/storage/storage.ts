import { ExtensionStorage } from "./storage.types";

export const fetchStorage = async (): Promise<ExtensionStorage> =>
  new Promise<ExtensionStorage>(async (resolve, reject) => {
    const unknownError = "Unknown error while reading the storage.";

    try {
      const storage = await chrome.storage.local.get<ExtensionStorage>(null);
      if (chrome.runtime.lastError) {
        const message = chrome.runtime.lastError.message || unknownError;
        reject(new Error(message));

        return;
      }

      resolve(storage);
    } catch (error) {
      if (error instanceof Error) {
        reject(new Error(error.message));

        return;
      }

      reject(new Error(unknownError));
    }
  });

export const setStorage = async (
  props: Partial<ExtensionStorage>
): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const unknownError = "Unknown error while setting the storage.";

    try {
      await chrome.storage.local.set<ExtensionStorage>(props);
      if (chrome.runtime.lastError) {
        const message = chrome.runtime.lastError.message || unknownError;
        reject(new Error(message));

        return;
      }

      resolve();
    } catch (error) {
      if (error instanceof Error) {
        reject(new Error(error.message));

        return;
      }

      reject(new Error(unknownError));
    }
  });
