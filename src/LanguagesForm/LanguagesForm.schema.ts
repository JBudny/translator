import { InferType, object, string } from "yup";

export const languagesFormSchema = object({
  SOURCE_LANGUAGE: string().required(),
  TARGET_LANGUAGE: string().required(),
});

export type LanguagesFormSchema = InferType<typeof languagesFormSchema>;
