import { InferType, object, string } from "yup";

const MAX_UUID_LENGTH = 36;

export const apiKeyFormSchema = object({
  apiKey: string()
    .required("API key is a required field")
    .max(MAX_UUID_LENGTH, `API key must be at most ${MAX_UUID_LENGTH} characters`),
});

export type ApiKeyFormSchema = InferType<typeof apiKeyFormSchema>;
