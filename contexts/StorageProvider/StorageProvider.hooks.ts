import { useContext } from "react";
import { StorageContext } from "./StorageProvider";

export const useStorage = () => {
  return useContext(StorageContext);
};
