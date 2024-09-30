import { ExtensionStorage } from "../src/extensionStorage.types";
import { API_ENDPOINTS } from "./constants";
import { ApiError } from "./errors";

let currentApiKey: string | undefined = '';
let currentBaseUrl: string | undefined = '';

chrome.storage.onChanged.addListener((changes) => {
  if ('apiKey' in changes) {
    currentApiKey = changes.apiKey.newValue;
  }
  if ('apiBaseURL' in changes) {
    currentBaseUrl = changes.apiBaseURL.newValue;
  }
});

chrome.storage.local.get<ExtensionStorage>()
  .then(({ apiKey, apiBaseURL }) => {
    if (apiKey)
      currentApiKey = apiKey;
    if (apiBaseURL)
      currentBaseUrl = apiBaseURL;
  });

export const api = async <T>(endpoint: API_ENDPOINTS, init: RequestInit): Promise<T> => {
  if (!currentBaseUrl)
    throw new Error("API Base URL is not set");

  try {
    const API_URL = new URL(endpoint, currentBaseUrl);
    const response = await fetch(API_URL, init);

    if (!response.ok) {
      if (response.status === 400) throw new ApiError("Invalid request.", { code: response.status })
      if (response.status === 403) throw new ApiError("Banned.", { code: response.status })
      if (response.status === 429) throw new ApiError("Slow down.", { code: response.status })
      if (response.status === 500) throw new ApiError("Server error.", { code: response.status })
    };

    return await response.json() as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw new ApiError(error.message, { code: error.cause.code });
    } else if (error instanceof DOMException &&
      (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error('The request was aborted due to a timeout.');
    } else if (error instanceof TypeError) {
      throw new Error('An error occurred while parsing the JSON response.');
    } else {
      throw new Error("Unknown error.");
    };
  };
};

export { currentApiKey, currentBaseUrl };
