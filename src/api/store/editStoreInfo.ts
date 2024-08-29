import { useMutation } from "@tanstack/react-query";
import { fetcher, ApiError } from "../config";

const updateStoreInfo = async (formData: FormData): Promise<StoreT> => {
  const { data } = await fetcher.patch<StoreT>(`/stores/edit/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useUpdateStoreInformation = () => {
  return useMutation<StoreT, ApiError, FormData>(updateStoreInfo);
};
