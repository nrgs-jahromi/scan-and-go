import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type DeleteBannerPayload = {
  barcode: string;
  image_url: string;
};

type ApiResponse = {
  success?: string;
  error?: string;
};

const deleteBanner = async (payload: DeleteBannerPayload): Promise<ApiResponse> => {
  const { data } = await fetcher.delete("delete-banners/", {
    data: payload,
  });
  return data;
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
    },
    onError: (error) => {
      console.error("Error deleting banner:", error);
    },
  });
};
