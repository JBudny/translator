import { useCallback, useState } from "react";
import {
  DetectResponse,
  FetchDetect,
  FetchDetectState,
  UseFetchDetect,
} from "./detect.types";
import {
  detectAction,
  DetectActionPayload,
  sendMessage,
} from "../../service-worker";

const initialState: FetchDetectState = {
  data: null,
  error: null,
  isLoading: false,
};

export const useFetchDetect = (): UseFetchDetect => {
  const [state, setState] = useState<FetchDetectState>(initialState);

  const fetchDetect: FetchDetect = useCallback(
    async ({ apiBaseURL, apiKey, onSuccess, q }) => {
      try {
        if (!q) throw new Error("Received no text to translate.");
        if (!apiBaseURL) throw new Error("API base URL is required");

        setState({ ...initialState, isLoading: true });
        const response = await sendMessage<DetectActionPayload, DetectResponse>(
          detectAction({ apiBaseURL, q, apiKey })
        );
        if (!response.success) {
          setState({ ...initialState, error: response.message });

          return;
        }

        setState({ ...initialState, data: response.data });
        if (onSuccess) onSuccess(response.data);

        return;
      } catch (error) {
        if (error instanceof Error) {
          setState({ ...initialState, error: error.message });

          return;
        }

        setState({
          ...initialState,
          error: "Unknown error while detecting language",
        });

        return;
      }
    },
    []
  );

  return [state, fetchDetect];
};
