import { normalize, schema } from "normalizr";
import { Language, LanguagesResponse } from "./languages.types";

export const transformLanguagesResponse = (
  response: Language[]
): LanguagesResponse => {
  const removeSourceFromTargets = (language: Language) => ({
    ...language,
    targets: language.targets.filter(
      (target: string) => target !== language.code
    ),
  });

  const language = new schema.Entity(
    "languages",
    {},
    {
      idAttribute: "code",
      processStrategy: removeSourceFromTargets,
    }
  );

  return normalize<
    Language,
    { languages: { [key: string]: Language } },
    string[]
  >(response, [language]);
};

