import { useCallback, useState } from "react";
import {
  FetchLanguagesState,
  LanguagesResponse,
  UseFetchLanguages,
} from "./languages.types";
import {
  languagesAction,
  LanguagesActionPayload,
  sendMessage,
} from "../../service-worker";

const initialState: FetchLanguagesState = {
  data: null,
  error: null,
  isLoading: false,
};

export const useFetchLanguages = (): UseFetchLanguages => {
  const [state, setState] = useState<FetchLanguagesState>(initialState);

  const { isLoading } = state;

  const fetchLanguages = useCallback(async (apiBaseURL?: string) => {
    if (!apiBaseURL && !isLoading) throw new Error("API base URL is required");

    setState({ ...initialState, isLoading: true });
    try {
      const response = await sendMessage<
        LanguagesActionPayload,
        LanguagesResponse
      >(languagesAction(apiBaseURL));
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
        error: "Unknown error while fetching languages",
      });

      return;
    }
  }, []);

  return [state, fetchLanguages];
};
