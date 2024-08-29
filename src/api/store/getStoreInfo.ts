import { useQuery } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

const fetchStoreInfo = async (): Promise<StoreT> => {
  const { data } = await fetcher.get<StoreT>(`/stores/info/`);
  return data;
};

export const useStoreInformation = () => {
  return useQuery<StoreT, ApiError>(["storeInfo"], fetchStoreInfo);
};
