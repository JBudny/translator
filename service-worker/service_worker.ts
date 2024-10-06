import { ApiError, languages, settings, SettingsResponse, translate, TranslateResponse } from "../api";
import { Actions, isGetSettingsAction, isLanguagesAction, isTranslateAction, MessageResponse, TranslateAction } from "./service_worker.types";
import { NormalizedLanguages } from "../api";

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

const handleLanguage = async (sendResponse: (response: MessageResponse<NormalizedLanguages>) => void) => {
  try {
    const response = await languages();

    sendResponse({ success: true, data: response });
  } catch (error) {
    sendResponse({
      success: false,
      error: {
        message: "Unknown error.",
      }
    });
  }
};

const handleGetSettings = async (sendResponse: (response: MessageResponse<SettingsResponse>) => void) => {
  try {
    const response = await settings();
    sendResponse({ success: true, data: response });
  } catch (error) {
    sendResponse({
      success: false,
      error: {
        message: "Unknown error.",
      }
    });
  }
};

chrome.runtime.onMessage.addListener((action: Actions, _sender, sendResponse: (response?: MessageResponse<NormalizedLanguages | TranslateResponse | SettingsResponse>) => void) => {
  const handleMessage = async () => {
    if (isTranslateAction(action)) {
      handleTranslate(action, sendResponse);
    };
    if (isLanguagesAction(action)) {
      handleLanguage(sendResponse);
    };
    if (isGetSettingsAction(action)) {
      handleGetSettings(sendResponse);
    };
  };

  handleMessage();
  return true;
});
