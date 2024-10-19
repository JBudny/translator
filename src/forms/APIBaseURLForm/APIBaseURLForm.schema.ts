import { InferType, object, string } from "yup";

const MAX_URL_LENGTH = 2048;

export const apiBaseURLFormSchema = object({
  apiBaseURL: string()
    .required("API URL is a required field")
    .max(MAX_URL_LENGTH, `API URL must be at most ${MAX_URL_LENGTH} characters`),
});

export type APIBaseURLFormSchema = InferType<typeof apiBaseURLFormSchema>;
