import { API_ENDPOINTS } from "../api";
import {
  DetectAction,
  LanguagesAction,
  ServerSettingsAction,
  TranslateAction
} from "./service_worker.types";

export const serverSettingsAction = (): ServerSettingsAction => ({
  type: API_ENDPOINTS.GET_SERVER_SETTINGS
});

export const languagesAction = (): LanguagesAction => ({
  type: API_ENDPOINTS.LANGUAGES
});

export const translateAction = (
  q: string,
  source: string,
  target: string,
): TranslateAction => ({
  payload: { q, source, target },
  type: API_ENDPOINTS.TRANSLATE
});

export const detectAction = (
  q: string,
): DetectAction => ({
  payload: { q },
  type: API_ENDPOINTS.DETECT
});

