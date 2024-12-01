import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";

export const useSettings = () => {
  const settings = useContext(SettingsContext);

  if (settings === null)
    throw new Error(
      "No SettingsContext.Provider found when calling useSettings."
    );

  return settings;
};
