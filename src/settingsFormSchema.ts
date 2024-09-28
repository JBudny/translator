import { InferType, object, string } from "yup";

const MAX_UUID_LENGTH = 36;
const MAX_URL_LENGTH = 2048;

export const settingsFormSchema = object({
  API_KEY: string().max(MAX_UUID_LENGTH),
  API_BASE_URL: string().required().max(MAX_URL_LENGTH),
});

export type SettingsFormSchema = InferType<typeof settingsFormSchema>;
