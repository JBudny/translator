import { useCallback, useState } from "react";
import { fetchStorage as fetchIt, setStorage as setIt } from "./storage";
import {
  FetchStorage,
  FetchStorageState,
  SetStorage,
  UseFetchStorage,
} from "./storage.types";

const initialState: FetchStorageState = {
  data: null,
  error: null,
  isLoading: false,
};

export const useFetchStorage = (): UseFetchStorage => {
  const [state, setState] = useState<FetchStorageState>(initialState);

  const fetchStorage: FetchStorage = useCallback(async (props) => {
    try {
      setState({ ...initialState, isLoading: true });
      const response = await fetchIt();

      setState({ ...initialState, data: response });
      if (props?.onSuccess) props.onSuccess();
      return;
    } catch (error) {
      if (error instanceof Error) {
        setState({ ...initialState, error: error.message });

        return;
      }

      setState({
        ...initialState,
        error: "Unknown error while fetching the storage",
      });

      return;
    }
  }, []);

  const setStorage: SetStorage = useCallback(async (props) => {
    setState({ ...initialState, data: props.currentStorage, isLoading: true });

    try {
      await setIt(props?.items);

      setState({
        ...initialState,
        data: { ...props.currentStorage, ...props.items },
      });
      if (props.onSuccess) props.onSuccess();
      return;
    } catch (error) {
      if (error instanceof Error) {
        setState({
          ...initialState,
          data: props.currentStorage,
          error: error.message,
        });

        return;
      }

      setState({
        ...initialState,
        data: props.currentStorage,
        error: "Unknown error while setting the storage",
      });

      return;
    }
  }, []);

  return [state, fetchStorage, setStorage];
};
