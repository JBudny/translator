import { useContext } from "react";
import { UserSettingsContext } from "./UserSettingsProvider";

export const useUserSettings = () => {
  return useContext(UserSettingsContext);
}