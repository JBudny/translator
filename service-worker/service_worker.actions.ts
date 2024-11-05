import { API_ENDPOINTS } from "../api";
import {
  DetectAction,
  LanguagesAction,
  ServerSettingsAction,
  TranslateAction
} from "./service_worker.types";

export const serverSettingsAction =
  (apiBaseURL: string): ServerSettingsAction => ({
    payload: { apiBaseURL },
    type: API_ENDPOINTS.GET_SERVER_SETTINGS
  });

export const languagesAction = (apiBaseURL?: string): LanguagesAction => ({
  payload: { apiBaseURL },
  type: API_ENDPOINTS.LANGUAGES
});

export const translateAction = (
  q: string,
  source: string,
  target: string,
  apiBaseURL?: string,
  apiKey?: string
): TranslateAction => ({
  payload: { apiBaseURL, q, source, target, apiKey },
  type: API_ENDPOINTS.TRANSLATE
});

export const detectAction = (
  q: string,
): DetectAction => ({
  payload: { q },
  type: API_ENDPOINTS.DETECT
});

