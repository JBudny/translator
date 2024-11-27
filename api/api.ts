import { API_ENDPOINTS } from "./constants";

export const api = async <T>(endpoint: API_ENDPOINTS, init: RequestInit, apiBaseURL?: string): Promise<T> => {
  if (!apiBaseURL)
    throw new Error("API Base URL is not set");

  try {
    const API_URL = new URL(endpoint, apiBaseURL);
    const response = await fetch(API_URL, init);

    if (!response.ok) {
      if (response.status === 400) throw new Error(`Invalid request. (${endpoint})`)
      if (response.status === 403) throw new Error(`Banned. (${endpoint})`)
      if (response.status === 429) throw new Error(`Slow down. (${endpoint})`)
      if (response.status === 500) throw new Error(`Server error. (${endpoint})`)
    };

    return await response.json() as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DOMException &&
      (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new Error(`The ${endpoint} request was aborted due to a timeout.`);
    } else if (error instanceof TypeError) {
      throw new Error(`An error occurred while parsing the ${endpoint} JSON response.`);
    } else {
      throw new Error(`Unknown error while fetching the ${endpoint} data.`);
    };
  };
};
