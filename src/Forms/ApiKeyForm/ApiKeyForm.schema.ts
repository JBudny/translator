import { InferType, object, string } from "yup";

const MAX_UUID_LENGTH = 36;

export const apiKeyFormSchema = object({
  apiKey: string().required().max(MAX_UUID_LENGTH),
});

export type ApiKeyFormSchema = InferType<typeof apiKeyFormSchema>;
