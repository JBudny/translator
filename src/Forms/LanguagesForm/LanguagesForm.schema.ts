import { InferType, object, string } from "yup";

export const languagesFormSchema = object({
  sourceLanguage: string().required(),
  targetLanguage: string().required(),
});

export type LanguagesFormSchema = InferType<typeof languagesFormSchema>;
