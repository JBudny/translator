import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { LanguagesResponse } from "./languages.types";

export const fetchLanguages = async (
  apiBaseURL?: string
): Promise<LanguagesResponse> =>
  await api<LanguagesResponse>(
    API_ENDPOINTS.LANGUAGES,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
