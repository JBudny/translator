import { useCallback, useState } from "react";
import { fetchStorage as fetchIt } from "./storage";
import { FetchStorageState, UseFetchStorage } from "./storage.types";

const initialState: FetchStorageState = {
  data: null,
  error: null,
  isLoading: false,
};


export const useFetchStorage = (): UseFetchStorage => {
  const [state, setState] = useState<FetchStorageState>(initialState);

  const fetchStorage = useCallback(async () => {
    setState({ ...initialState, isLoading: true });
    try {
      const response = await fetchIt();

      setState({ ...initialState, data: response });

      return;
    } catch (error) {
      if (error instanceof Error) {
        setState({ ...initialState, error: error.message });

        return;
      }

      setState({
        ...initialState,
        error: "Unknown error while fetching storage",
      });

      return;
    }
  }, []);

  return [state, fetchStorage];
};
