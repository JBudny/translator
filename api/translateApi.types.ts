export interface TranslateResponse {
  alternatives?: string[];
  translatedText: string;
};

export class ApiError extends Error {
  private readonly _cause: { code: number };

  constructor(message: string, cause: { code: number }) {
    super(message);
    this._cause = cause;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get cause() {
    return this._cause;
  }
}