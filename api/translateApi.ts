import { ApiError, TranslateResponse } from "./translateApi.types";

const BASE_URL = '';
const TRANSLATE_ENDPOINT = 'translate';
const API_KEY = '';
const TIMEOUT = 5000;

export const translate = async (q: string, source: string, target: string): Promise<TranslateResponse> => {
  const API_URL = new URL(TRANSLATE_ENDPOINT, BASE_URL);
  const withAlternatives = q.trim().split(" ").length <= 3;

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      q,
      source,
      target,
      format: "text",
      alternatives: withAlternatives ? 3 : 0,
      api_key: API_KEY,
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
