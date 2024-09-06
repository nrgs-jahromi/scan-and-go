import { useQuery, QueryFunction, UseQueryOptions } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type LowStockProduct = {
  barcode: string;
  name: string;
  stock: number;
};

type LowStockResponse = LowStockProduct[];

const fetchLowStockProducts: QueryFunction<LowStockResponse> = async () => {
  const { data } = await fetcher.get<LowStockResponse>("/products/low-stock/");
  return data;
};

export const useLowStockProducts = (
  options?: UseQueryOptions<LowStockResponse, ApiError>
) => {
  return useQuery<LowStockResponse, ApiError>(
    ["lowStockProducts"],
    fetchLowStockProducts,
    options
  );
};
