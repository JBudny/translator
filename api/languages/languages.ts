import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { LanguagesResponse } from "./languages.types";

export const languages = async (): Promise<LanguagesResponse> => {

  return await api<LanguagesResponse>(API_ENDPOINTS.LANGUAGES, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(API_TIMEOUT),
  });
};
