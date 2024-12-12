import { API_ENDPOINTS } from "../api";
import {
  DetectAction,
  DetectActionPayload,
  LanguagesAction,
  SettingsAction,
  TranslateAction,
  TranslateActionPayload,
} from "./service_worker.types";

export const settingsAction = (apiBaseURL?: string): SettingsAction => ({
  payload: { apiBaseURL },
  type: API_ENDPOINTS.SETTINGS,
});

export const languagesAction = (apiBaseURL?: string): LanguagesAction => ({
  payload: { apiBaseURL },
  type: API_ENDPOINTS.LANGUAGES,
});

export const translateAction = (
  payload: TranslateActionPayload
): TranslateAction => {
  const { q, source, target, apiBaseURL, apiKey } = payload;

  return {
    payload: { apiBaseURL, q, source, target, apiKey },
    type: API_ENDPOINTS.TRANSLATE,
  };
};

export const detectAction = (payload: DetectActionPayload): DetectAction => {
  const { apiBaseURL, q, apiKey } = payload;

  return {
    payload: { apiBaseURL, q, apiKey },
    type: API_ENDPOINTS.DETECT,
  };
};
