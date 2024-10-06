import { API_ENDPOINTS } from "../api";

export type DetectActionType = API_ENDPOINTS.DETECT;
export type LanguagesActionType = API_ENDPOINTS.LANGUAGES;
export type GetServerSettingsActionType = API_ENDPOINTS.GET_SERVER_SETTINGS;
export type TranslateActionType = API_ENDPOINTS.TRANSLATE;

export interface TranslateActionPayload {
  q: string;
  source: string;
  target: string;
};

export interface DetectActionPayload {
  q: string;
};

export type ActionTypes = DetectActionType | LanguagesActionType | GetServerSettingsActionType | TranslateActionType;

export interface Action {
  type: ActionTypes;
};

export interface PayloadAction<T> extends Action {
  payload: T;
};

export type DetectAction = PayloadAction<DetectActionPayload>;
export type LanguagesAction = Action;
export type GetServerSettingsAction = Action;
export type TranslateAction = PayloadAction<TranslateActionPayload>;
export type Actions = DetectAction | LanguagesAction | TranslateAction;

export const isLanguagesAction = (action: Actions): action is LanguagesAction =>
  action.type === API_ENDPOINTS.LANGUAGES;

export const isTranslateAction = (action: Actions): action is TranslateAction =>
  action.type === API_ENDPOINTS.TRANSLATE;

export const isGetServerSettingsAction = (action: Actions): action is GetServerSettingsAction =>
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
