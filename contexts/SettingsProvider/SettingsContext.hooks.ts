import { useContext } from "react";
import { SettingsContext } from "./SettingsProvider";

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error("useSettings hook must be used within a SettingsProvider");

  return context
};
