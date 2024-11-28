import { createContext, FC, PropsWithChildren, useEffect } from "react";
import { UseFetchStorage, useFetchStorage } from "../../api";

export const StorageContext = createContext<UseFetchStorage | null>(null);

export const StorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storage, fetchStorage] = useFetchStorage();

  // listen for storage changes and sync the StorageProvider
  useEffect(() => {
    // Get storage data initially
    fetchStorage();

    // Set listener for storage data change event
    chrome.storage.onChanged.addListener(fetchStorage);

    return () => {
      chrome.storage.onChanged.removeListener(fetchStorage);
    };
  }, [fetchStorage]);

  if (storage.error) return <div style={{padding: "30px", backgroundColor: 'red'}}>{storage.error}</div>;
  if (storage.isLoading) return <div style={{padding: "30px", backgroundColor: 'red'}}><p>{'loading...'}</p></div>;

  const value: UseFetchStorage = [storage, fetchStorage];

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

