import { createContext, FC, PropsWithChildren } from "react";
import { UseFetchStorage, useFetchStorage } from "../../api";

export const StorageContext = createContext<UseFetchStorage | null>(null);

export const StorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storage, fetchStorage, setStorage] = useFetchStorage();

  const value: UseFetchStorage = [storage, fetchStorage, setStorage];

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
