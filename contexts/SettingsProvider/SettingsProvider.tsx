import { createContext, FC, PropsWithChildren } from "react";
import { UseFetchSettings, useFetchSettings } from "../../api";

export const SettingsContext = createContext<UseFetchSettings | null>(null);

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [settings, fetchSettings] = useFetchSettings();

  const value: UseFetchSettings = [settings, fetchSettings];

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
