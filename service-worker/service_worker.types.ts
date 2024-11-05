import { API_ENDPOINTS } from "../api";

export type DetectActionType = API_ENDPOINTS.DETECT;
export type LanguagesActionType = API_ENDPOINTS.LANGUAGES;
export type ServerSettingsActionType = API_ENDPOINTS.GET_SERVER_SETTINGS;
export type TranslateActionType = API_ENDPOINTS.TRANSLATE;

export interface LanguagesActionPayload {
  apiBaseURL?: string;
};

export interface ServerSettingsActionPayload {
  apiBaseURL: string;
};

export interface TranslateActionPayload {
  q: string;
  source: string;
  target: string;
  apiBaseURL?: string;
  apiKey?: string;
};

export interface DetectActionPayload {
  q: string;
};

export type ActionTypes = DetectActionType | LanguagesActionType | ServerSettingsActionType | TranslateActionType;

export interface Action {
  type: ActionTypes;
};

export interface PayloadAction<T> extends Action {
  payload: T;
};

export type DetectAction = PayloadAction<DetectActionPayload>;
export type LanguagesAction = PayloadAction<LanguagesActionPayload>;
export type ServerSettingsAction = PayloadAction<ServerSettingsActionPayload>;;
export type TranslateAction = PayloadAction<TranslateActionPayload>;
export type Actions = Action | DetectAction | LanguagesAction | TranslateAction;

export const isLanguagesAction = (action: Actions): action is LanguagesAction =>
  action.type === API_ENDPOINTS.LANGUAGES;

export const isTranslateAction = (action: Actions): action is TranslateAction =>
  action.type === API_ENDPOINTS.TRANSLATE;

export const isServerSettingsAction = (action: Actions): action is ServerSettingsAction =>
  action.type === API_ENDPOINTS.GET_SERVER_SETTINGS;

export interface MessageErrorResponse {
  success: false;
  error: {
    message: Error['message'];
    cause?: number;
  }
}

export interface MessageSuccessResponse<T> {
  success: true;
  data: T;
}

export type MessageResponse<T> = MessageErrorResponse | MessageSuccessResponse<T>;
