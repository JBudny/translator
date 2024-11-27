import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { ServerSettingsResponse } from "./settings.types";

export const fetchSettings = async (
  apiBaseURL?: string
): Promise<ServerSettingsResponse> =>
  await api<ServerSettingsResponse>(
    API_ENDPOINTS.GET_SERVER_SETTINGS,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
