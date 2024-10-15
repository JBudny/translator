import { normalize, schema } from "normalizr";
import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { Language, LanguagesResponse, NormalizedLanguages } from "./languages.types";

export const languages = async (): Promise<NormalizedLanguages> => {
  try {
    const response: LanguagesResponse = await api<LanguagesResponse>(API_ENDPOINTS.LANGUAGES, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(API_TIMEOUT),
    });

    const removeSourceLanguageFromTargets = (language: Language) => ({
      ...language,
      targets: language.targets.filter((target: string) =>
        target !== language.code
      )
    });

    const language = new schema.Entity("languages", {}, {
      idAttribute: "code", processStrategy: removeSourceLanguageFromTargets
    });

    return new Promise((res) =>
      res(
        normalize<Language, { languages: { [key: string]: Language } }, string[]>(response, [language])
      )
    );
  } catch (error) {
    throw error;
  }
}

