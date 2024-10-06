import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { SettingsResponse } from "./settings.types";

export const settings = async (): Promise<SettingsResponse> => {
  return await api<SettingsResponse>(API_ENDPOINTS.GET_SETTINGS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(API_TIMEOUT),
  });
};
