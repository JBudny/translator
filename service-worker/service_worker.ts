import {
  ApiError,
  fetchLanguages,
  fetchSettings,
  ServerSettingsResponse,
  fetchTranslate,
  TranslateResponse
} from "../api";
import {
  Actions,
  isServerSettingsAction,
  isLanguagesAction,
  isTranslateAction,
  LanguagesAction,
  MessageErrorResponse,
  MessageResponse,
  ServerSettingsAction,
  TranslateAction
} from "./service_worker.types";
import { NormalizedLanguagesResponse } from "../api";
import { transformLanguagesResponse } from "../api/languages";

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

  errorMessage.error.message = `Unknown error inside the service worker. (${context})`;
  sendResponse(errorMessage);

  return;
};

const handleTranslate = async (
  { payload: { q, source, target, apiBaseURL, apiKey } }: TranslateAction,
  sendResponse: (response: MessageResponse<TranslateResponse>) => void
) => {
  try {
    const translation = await fetchTranslate(q, source, target, apiBaseURL, apiKey);

    sendResponse({ success: true, data: translation });
  } catch (error) {
    handleError(error, sendResponse, 'handleTranslate');
  };
};

const handleLanguages = async (
  { payload: { apiBaseURL } }: LanguagesAction,
  sendResponse: (response: MessageResponse<NormalizedLanguagesResponse>) => void) => {
  try {
    const response = await fetchLanguages(apiBaseURL);
    const transformedResponse = transformLanguagesResponse(response);

    sendResponse({ success: true, data: transformedResponse });
  } catch (error) {
    handleError(error, sendResponse, 'handleLanguages');
  };
};

const handleServerSettings = async (
  { payload: { apiBaseURL } }: ServerSettingsAction,
  sendResponse: (response: MessageResponse<ServerSettingsResponse>) => void) => {
  try {
    const response = await fetchSettings(apiBaseURL);

    sendResponse({ success: true, data: response });
  } catch (error) {
    handleError(error, sendResponse, 'handleServerSettings');
  };
};

chrome.runtime.onMessage.addListener((action: Actions, _sender, sendResponse: (response?: MessageResponse<NormalizedLanguagesResponse | TranslateResponse | ServerSettingsResponse>) => void) => {
  const handleMessage = async () => {
    if (isTranslateAction(action)) {
      handleTranslate(action, sendResponse);

      return;
    };
    if (isLanguagesAction(action)) {
      handleLanguages(action, sendResponse);

      return;
    };
    if (isServerSettingsAction(action)) {
      handleServerSettings(action, sendResponse);

      return;
    };

    handleError(
      new Error("Unknown message type in service worker"),
      sendResponse, 'handleMessage'
    );
  };

  handleMessage();
  return true;
});
