import { useCallback, useState } from "react";
import {
  FetchSettingsState,
  SettingsResponse,
  UseFetchSettings,
} from "./settings.types";
import {
  sendMessage,
  settingsAction,
  SettingsActionPayload,
} from "../../service-worker";

const initialState: FetchSettingsState = {
  data: null,
  error: null,
  isLoading: false,
};

export const useFetchSettings = (): UseFetchSettings => {
  const [state, setState] = useState<FetchSettingsState>(initialState);

  const { isLoading } = state;

  const fetchLanguages = useCallback(async (apiBaseURL?: string) => {
    if (!apiBaseURL && !isLoading) throw new Error("API base URL is required");

    setState({ ...initialState, isLoading: true });
    try {
      const response = await sendMessage<
        SettingsActionPayload,
        SettingsResponse
      >(settingsAction(apiBaseURL));
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
        error: "Unknown error while fetching settings",
      });

      return;
    }
  }, []);

  return [state, fetchLanguages];
};
