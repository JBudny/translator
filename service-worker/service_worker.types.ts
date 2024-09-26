export type TranslateActionType = "TRANSLATE";
export type DetectActionType = "DETECT";

export interface TranslateActionPayload {
  q: string;
  source: string;
  target: string;
};

export interface DetectActionPayload {
  q: string;
};

export type ActionTypes = TranslateActionType | DetectActionType;

export interface Action<T> {
  type: ActionTypes;
  payload: T;
};

export type TranslateAction = Action<TranslateActionPayload>;
export type DetectAction = Action<DetectActionPayload>;
export type Actions = TranslateAction | DetectAction;

export const isTranslateAction = (action: Actions): action is TranslateAction =>
  action.type === 'TRANSLATE';

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
