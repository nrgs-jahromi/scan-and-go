import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type AddBannerPayload = {
  barcode: string;
  image: File | null;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

const addBanner = async (payload: AddBannerPayload): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("barcode", payload.barcode);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await fetcher.post("/stores/add-banner/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddBanner = () => {
  const queryClient = useQueryClient();

  return useMutation(addBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]); // Update the query key to match your banners query
    },
    onError: (error) => {
      console.error("Error adding banner:", error);
    },
  });
};
