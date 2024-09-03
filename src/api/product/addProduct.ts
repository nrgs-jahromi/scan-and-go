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
  current_images?: number[] | null;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

const addProduct = async (productData: FormData): Promise<ApiResponse> => {
  const { data } = await fetcher.post("/products/add/", productData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },

    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
};
