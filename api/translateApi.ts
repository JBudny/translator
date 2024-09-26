import { SettingsFormSchema } from "../src/settingsFormSchema";
import { ApiError, TranslateResponse } from "./translateApi.types";

// Constants
const TRANSLATE_ENDPOINT = 'translate';
const TIMEOUT = 5000;

// State variables
let currentApiKey: string | undefined = '';
let currentBaseUrl: string | undefined = '';

chrome.storage.onChanged.addListener((changes) => {
  if ('API_KEY' in changes) {
    currentApiKey = changes.API_KEY.newValue;
  }
  if ('API_BASE_URL' in changes) {
    currentBaseUrl = changes.API_BASE_URL.newValue;
  }
});

chrome.storage.local.get<SettingsFormSchema>()
  .then(({ API_KEY, API_BASE_URL }) => {
    if (API_KEY)
      currentApiKey = API_KEY;
    if (API_BASE_URL)
      currentBaseUrl = API_BASE_URL;
  });

export const translate = async (q: string, source: string, target: string): Promise<TranslateResponse> => {
  if (!currentBaseUrl)
    throw new Error("API Base URL is not set");

  const API_URL = new URL(TRANSLATE_ENDPOINT, currentBaseUrl);
  const withAlternatives = q.trim().split(" ").length <= 3;
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      q,
      source,
      target,
      format: "text",
      alternatives: withAlternatives ? 3 : 0,
      api_key: currentApiKey,
    }),
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT),
  }).then((res) => {
    if (!res.ok) throw res;

    return res.json();
  }).catch((error) => {
    if (error.status === 400) {
      throw new ApiError("Invalid request.", { code: error.status });
    } else if (error.status === 403) {
      throw new ApiError("Banned.", { code: error.status });
    } else if (error.status === 429) {
      throw new ApiError("Slow down.", { code: error.status });
    } else if (error.status === 500) {
      throw new ApiError("Translation error.", { code: error.status });
    } else if (error.name === 'TimeoutError') {
      throw new Error('The request was aborted due to a timeout.');
    } else if (error instanceof TypeError) {
      throw new Error('An error occurred while parsing the JSON response.');
    } else {
      throw new Error("Unknown network error.");
    }
  });

  return response;
};
