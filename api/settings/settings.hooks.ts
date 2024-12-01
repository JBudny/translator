import { useCallback, useState } from "react";
import {
  FetchSettings,
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

  const fetchSettings: FetchSettings = useCallback(async (props) => {
    try {
      if (!props?.apiBaseURL) throw new Error("API base URL is required");

      setState({ ...initialState, isLoading: true });
      const response = await sendMessage<
        SettingsActionPayload,
        SettingsResponse
      >(settingsAction(props?.apiBaseURL));
      if (!response.success) {
        setState({ ...initialState, error: response.message });

        return;
      }

      setState({ ...initialState, data: response.data });
      if (props?.onSuccess) props.onSuccess();

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

  return [state, fetchSettings];
};
