import { Action, MessageResponse, PayloadAction } from "./service_worker.types";

export const sendMessage = <PayloadType, ResponseType>(
  action: PayloadAction<PayloadType> | Action
) =>
  new Promise<MessageResponse<ResponseType>>((resolve, reject) =>
    browser.runtime.sendMessage<
      PayloadAction<PayloadType> | Action,
      MessageResponse<ResponseType>
    >(action, (response) => {
      if (!response.success) {
        reject(new Error(response.message));
      }
      resolve(response);
    })
  );
