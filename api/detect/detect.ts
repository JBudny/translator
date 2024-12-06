import { api } from "../api";
import { API_ENDPOINTS, API_TIMEOUT } from "../constants";
import { DetectResponse } from "./detect.types";

export const fetchDetect = async (
  q: string,
  apiBaseURL?: string,
  apiKey?: string
): Promise<DetectResponse> =>
  await api<DetectResponse>(
    API_ENDPOINTS.DETECT,
    {
      method: "POST",
      body: JSON.stringify({
        q,
        api_key: apiKey,
      }),
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT),
    },
    apiBaseURL
  );
