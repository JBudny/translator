import { ApiError, translate, TranslateResponse } from "../api";
import { Actions, isTranslateAction, MessageResponse, TranslateAction } from "./service_worker.types";

const handleTranslate = async (
  { payload: { q, source, target } }: TranslateAction,
  sendResponse: (response: MessageResponse<TranslateResponse>) => void
) => {
  try {
    const translation = await translate(q, source, target);
    sendResponse({
      success: true,
      data: translation
    });
  } catch (error) {
    if (error instanceof ApiError) {
      sendResponse({
        success: false,
        error: {
          message: error.message,
          cause: error.cause.code
        }
      });
    } else if (error instanceof Error) {
      sendResponse({
        success: false,
        error: {
          message: error.message,
        }
      });
    } else {
      sendResponse({
        success: false,
        error: {
          message: "Unknown error.",
        }
      });
    }
  }
};

chrome.runtime.onMessage.addListener((action: Actions, _sender, sendResponse) => {
  const handleMessage = async () => {
    if (isTranslateAction(action)) {
      handleTranslate(action, sendResponse)
    }
  };

  handleMessage();
  return true;
});
