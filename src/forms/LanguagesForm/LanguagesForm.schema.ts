import { array, bool, InferType, lazy, object, string } from "yup";

const baseSchema = {
  detect: bool(),
};

const detectSchema = object({
  ...baseSchema,
  detectForm: array().of(
    object({
      targetLanguage: string().required("Terget is a required field"),
    })
  ),
});

const manualSchema = object({
  ...baseSchema,
  manualForm: array().of(
    object({
      sourceLanguage: string().required("Source is a required field"),
      targetLanguage: string().required("Terget is a required field"),
    })
  ),
});

export const languagesFormSchema = lazy((values) =>
  values.detect ? detectSchema : manualSchema
);

export type LanguagesFormSchema = InferType<typeof languagesFormSchema>;
export type DetectSchema = InferType<typeof detectSchema>;
export type ManualSchema = InferType<typeof manualSchema>;

export const isDetectForm = (data: LanguagesFormSchema): data is DetectSchema =>
  data.detect === true;
export const isManualForm = (data: LanguagesFormSchema): data is ManualSchema =>
  data.detect === false;
