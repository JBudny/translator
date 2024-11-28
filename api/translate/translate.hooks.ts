import { useCallback, useState } from "react";
import { FetchTranslationState, TranslateResponse, UseFetchTranslate } from "./translate.types";
import {
  sendMessage,
  translateAction,
  TranslateActionPayload,
} from "../../service-worker";

const initialState: FetchTranslationState = {
  data: null,
  error: null,
  isLoading: false,
};

export const useFetchTranslate = (): UseFetchTranslate => {
  const [state, setState] = useState<FetchTranslationState>(initialState);

  const { isLoading } = state;

  const fetchTranslation = useCallback(
    async ({ q, source, target, apiBaseURL, apiKey }: TranslateActionPayload) => {
      if (!apiBaseURL && !isLoading)
        throw new Error("API base URL is required.");
      if (!q && !isLoading)
        throw new Error("Received no text to translate.");
      if ((!source || !target) && !isLoading)
        throw new Error("Languages are not set.");

      setState({ ...initialState, isLoading: true });
      try {
        const response = await sendMessage<
          TranslateActionPayload,
          TranslateResponse
        >(translateAction(q, source, target, apiBaseURL, apiKey));
        if (!response.success) {
          setState({ ...initialState, error: response.message });

          return;
        }

        setState({ ...initialState, data: response.data });

        return;
      } catch (error) {
        if (error instanceof Error) {
          setState({ ...initialState, error: error.message });

          return;
        }

        setState({
          ...initialState,
          error: "Unknown error while fetching translation",
        });

        return;
      }
    },
    []
  );

  return [state, fetchTranslation];
};
