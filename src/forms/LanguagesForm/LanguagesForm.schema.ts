import { InferType, object, string } from "yup";

export const languagesFormSchema = object({
  sourceLanguage: string().required("Source is a required field"),
  targetLanguage: string().required("Terget is a required field"),
});

export type LanguagesFormSchema = InferType<typeof languagesFormSchema>;
