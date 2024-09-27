import { Action, PayloadAction } from "./service_worker.types";

export const sendMessage = <T, ResponseType>(action: PayloadAction<T> | Action): Promise<ResponseType> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      action, (response) => resolve(response)
    );
  });
};
