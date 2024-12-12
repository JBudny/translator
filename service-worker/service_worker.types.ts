import { API_ENDPOINTS } from "../api";

export type DetectActionType = API_ENDPOINTS.DETECT;
export type LanguagesActionType = API_ENDPOINTS.LANGUAGES;
export type SettingsActionType = API_ENDPOINTS.SETTINGS;
export type TranslateActionType = API_ENDPOINTS.TRANSLATE;

export interface LanguagesActionPayload {
  apiBaseURL?: string;
};

export interface SettingsActionPayload {
  apiBaseURL?: string;
};

export interface TranslateActionPayload {
  q: string;
  source: string;
  target: string;
  apiBaseURL: string;
  apiKey?: string;
};

export interface DetectActionPayload {
  apiBaseURL: string;
  q: string;
  apiKey?: string;
};

export type ActionTypes =
  | DetectActionType
  | LanguagesActionType
  | SettingsActionType
  | TranslateActionType;

export interface Action {
  type: ActionTypes;
};

export interface PayloadAction<T> extends Action {
  payload: T;
};

export type DetectAction = PayloadAction<DetectActionPayload>;
export type LanguagesAction = PayloadAction<LanguagesActionPayload>;
export type SettingsAction = PayloadAction<SettingsActionPayload>;
export type TranslateAction = PayloadAction<TranslateActionPayload>;
export type Actions = Action | DetectAction | LanguagesAction | TranslateAction;

export const isDetectAction = (action: Actions): action is DetectAction =>
  action.type === API_ENDPOINTS.DETECT;

export const isLanguagesAction = (action: Actions): action is LanguagesAction =>
  action.type === API_ENDPOINTS.LANGUAGES;

export const isServerSettingsAction = (
  action: Actions
): action is SettingsAction => action.type === API_ENDPOINTS.SETTINGS;

export const isTranslateAction = (action: Actions): action is TranslateAction =>
  action.type === API_ENDPOINTS.TRANSLATE;

export interface MessageErrorResponse {
  success: false;
  message: Error["message"];
};

export interface MessageSuccessResponse<T> {
  success: true;
  data: T;
};

export type MessageResponse<T> =
  | MessageErrorResponse
  | MessageSuccessResponse<T>;
