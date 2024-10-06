import { useContext } from "react"
import { ServerSettingsContext } from "./ServerSettingsProvider"

export const useServerSettings = () => {
  return useContext(ServerSettingsContext);
};
