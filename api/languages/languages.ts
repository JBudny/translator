import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { Language } from "./languages.types";

export const fetchLanguages = async (
  apiBaseURL?: string
): Promise<Language[]> =>
  await api<Language[]>(
    API_ENDPOINTS.LANGUAGES,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
