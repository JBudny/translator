import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { SettingsResponse } from "./settings.types";

export const fetchSettings = async (
  apiBaseURL?: string
): Promise<SettingsResponse> =>
  await api<SettingsResponse>(
    API_ENDPOINTS.GET_SERVER_SETTINGS,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
