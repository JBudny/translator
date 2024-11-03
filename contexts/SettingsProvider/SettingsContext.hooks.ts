import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";

export const useSettings = () => {
  return useContext(SettingsContext);
};
