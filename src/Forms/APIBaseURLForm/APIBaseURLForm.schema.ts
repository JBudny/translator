import { InferType, object, string } from "yup";

const MAX_URL_LENGTH = 2048;

export const apiBaseURLFormSchema = object({
  apiBaseURL: string().required().max(MAX_URL_LENGTH),
});

export type APIBaseURLFormSchema = InferType<typeof apiBaseURLFormSchema>;
