import { Action } from "./service_worker.types";

export const sendMessage = <T, ResponseType>(action: Action<T>): Promise<ResponseType> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      action, (response) => resolve(response)
    );
  });
};
