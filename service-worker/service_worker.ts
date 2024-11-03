import {
  ApiError,
  languages,
  settings,
  ServerSettingsResponse,
  translate,
  TranslateResponse
} from "../api";
import {
  Actions,
  isServerSettingsAction,
  isLanguagesAction,
  isTranslateAction,
  MessageErrorResponse,
  MessageResponse,
  TranslateAction
} from "./service_worker.types";
import { NormalizedLanguages } from "../api";

const handleError = (
  error: unknown,
  sendResponse: (response: MessageErrorResponse) => void,
  context: string
): void => {
  let errorMessage: MessageErrorResponse = {
    success: false,
    error: { message: '' },
  };

  if (error instanceof ApiError) {
    errorMessage.error = { message: error.message, cause: error.cause.code };
    sendResponse(errorMessage);

    return;
  };

  if (error instanceof Error) {
    errorMessage.error.message = error.message;
    sendResponse(errorMessage);

    return;
  };

  errorMessage.error.message = `Unknown error inside the service worker ${context}.`;
  sendResponse(errorMessage);

  return;
};

const handleTranslate = async (
  { payload: { q, source, target } }: TranslateAction,
  sendResponse: (response: MessageResponse<TranslateResponse>) => void
) => {
  try {
    const translation = await translate(q, source, target);

    sendResponse({ success: true, data: translation });
  } catch (error) {
    handleError(error, sendResponse, 'handleTranslate');
  };
};

const handleLanguages = async (sendResponse: (response: MessageResponse<NormalizedLanguages>) => void) => {
  try {
    const response = await languages();

    sendResponse({ success: true, data: response });
  } catch (error) {
    handleError(error, sendResponse, 'handleLanguages');
  };
};

const handleGetServerSettings = async (sendResponse: (response: MessageResponse<ServerSettingsResponse>) => void) => {
  try {
    const response = await settings();

    sendResponse({ success: true, data: response });
  } catch (error) {
    handleError(error, sendResponse, 'handleGetServerSettings');
  };
};

chrome.runtime.onMessage.addListener((action: Actions, _sender, sendResponse: (response?: MessageResponse<NormalizedLanguages | TranslateResponse | ServerSettingsResponse>) => void) => {
  const handleMessage = async () => {
    if (isTranslateAction(action)) {
      handleTranslate(action, sendResponse);
    };
    if (isLanguagesAction(action)) {
      handleLanguages(sendResponse);
    };
    if (isServerSettingsAction(action)) {
      handleGetServerSettings(sendResponse);
    };
  };

  handleMessage();
  return true;
});
