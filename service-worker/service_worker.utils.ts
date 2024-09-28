import { Action, MessageResponse, PayloadAction } from "./service_worker.types";

export const sendMessage = <PayloadType, ResponseType>(action:
  PayloadAction<PayloadType> | Action) =>
  new Promise<MessageResponse<ResponseType>>((resolve) =>
    chrome.runtime.sendMessage<PayloadAction<PayloadType> | Action,
      MessageResponse<ResponseType>>(action, (response) =>
        resolve(response)
      )
  );
