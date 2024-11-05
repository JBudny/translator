import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { TranslateResponse } from "./translate.types";

export const translate = async (
  q: string,
  source: string,
  target: string,
  apiBaseURL?: string,
  apiKey?: string
) => {
  const withAlternatives = q.trim().split(" ").length <= 3;

  return await api<TranslateResponse>(
    API_ENDPOINTS.TRANSLATE,
    {
      method: 'POST',
      body: JSON.stringify({
        q,
        source,
        target,
        format: "text",
        alternatives: withAlternatives ? 3 : 0,
        api_key: apiKey,
      }),
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
};
