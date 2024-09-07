import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetcher } from "../config";

type Discount = {
  discount_percentage: number | null;
  expiration_date: string | null;
  min_quantity_for_discount: number | null;
};

export type AddProductPayload = {
  name: string;
  categories: string[];
  description: string;
  barcode: string;
  price: string;
  stock: number;
  min_stock: number;
  brand?: string | null;
  location?: string | null;
  discount: Discount | null;
  images?: File[] | null;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

const updateProduct = async (productData: FormData , barcode: string): Promise<ApiResponse> => {
  const { data } = await fetcher.post(`/products/edit/${barcode}/`, productData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((params: { productData: FormData, barcode: string }) => updateProduct(params.productData, params.barcode), {
    onSuccess: () => {
      queryClient.invalidateQueries(["products", { page: 1, page_size: 10 }]);
      queryClient.refetchQueries(["products"]);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
};
