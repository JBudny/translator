import {
  fetchLanguages,
  fetchSettings,
  SettingsResponse,
  fetchTranslate,
  TranslateResponse,
} from "../api";
import {
  Actions,
  isServerSettingsAction,
  isLanguagesAction,
  isTranslateAction,
  LanguagesAction,
  MessageErrorResponse,
  MessageResponse,
  SettingsAction,
  TranslateAction,
} from "./service_worker.types";
import {
  LanguagesResponse,
  transformLanguagesResponse,
} from "../api";

const handleError = (
  error: unknown,
  sendResponse: (response: MessageErrorResponse) => void,
  context: string
): void => {
  const response: MessageErrorResponse = {
    success: false,
    message: `Unknown error inside the service worker. (${context})`,
  };

  if (error instanceof Error) {
    const { message } = error;
    sendResponse({ ...response, message });

    return;
  }

  sendResponse(response);

  return;
};

const handleTranslate = async (
  { payload: { q, source, target, apiBaseURL, apiKey } }: TranslateAction,
  sendResponse: (response: MessageResponse<TranslateResponse>) => void
) => {
  try {
    const translation = await fetchTranslate(
      q,
      source,
      target,
      apiBaseURL,
      apiKey
    );

    sendResponse({ success: true, data: translation });
  } catch (error) {
    handleError(error, sendResponse, "handleTranslate");
  }
};

const handleLanguages = async (
  { payload: { apiBaseURL } }: LanguagesAction,
  sendResponse: (response: MessageResponse<LanguagesResponse>) => void
) => {
  try {
    const response = await fetchLanguages(apiBaseURL);
    const transformedResponse = transformLanguagesResponse(response);

    sendResponse({ success: true, data: transformedResponse });
  } catch (error) {
    handleError(error, sendResponse, "handleLanguages");
  }
};

const handleServerSettings = async (
  { payload: { apiBaseURL } }: SettingsAction,
  sendResponse: (response: MessageResponse<SettingsResponse>) => void
) => {
  try {
    const response = await fetchSettings(apiBaseURL);

    sendResponse({ success: true, data: response });
  } catch (error) {
    handleError(error, sendResponse, "handleServerSettings");
  }
};

chrome.runtime.onMessage.addListener(
  (
    action: Actions,
    _sender,
    sendResponse: (
      response?: MessageResponse<
        LanguagesResponse | TranslateResponse | SettingsResponse
      >
    ) => void
  ) => {
    const handleMessage = async () => {
      if (isTranslateAction(action)) {
        handleTranslate(action, sendResponse);

        return;
      }
      if (isLanguagesAction(action)) {
        handleLanguages(action, sendResponse);

        return;
      }
      if (isServerSettingsAction(action)) {
        handleServerSettings(action, sendResponse);

        return;
      }

      handleError(
        new Error("Unknown message type in service worker"),
        sendResponse,
        "handleMessage"
      );
    };

    handleMessage();
    return true;
  }
);

