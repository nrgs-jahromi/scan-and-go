import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetcher } from "../config";

type ApiResponse = {
  message?: string;
  error?: string;
};

const deleteProduct = async (barcode: string): Promise<ApiResponse> => {
  const { data } = await fetcher.delete(`/products/delete/${barcode}/`);
  return data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((barcode: string) => deleteProduct(barcode), {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
