import { useQuery, QueryFunction, UseQueryOptions } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type TopSellingProduct = {
  product_barcode: string;
  name: string;
  total_sold: number;
};

type TopSellingResponse = TopSellingProduct[];

const fetchTopSellingProducts: QueryFunction<TopSellingResponse> = async () => {
  const { data } = await fetcher.get<TopSellingResponse>("/stores/top-selling/");
  return data;
};

export const useTopSellingProducts = (
  options?: UseQueryOptions<TopSellingResponse, ApiError>
) => {
  return useQuery<TopSellingResponse, ApiError>(
    ["topSellingProducts"],
    fetchTopSellingProducts,
    options
  );
};
