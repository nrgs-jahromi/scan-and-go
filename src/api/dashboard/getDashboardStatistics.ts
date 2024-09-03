import { useQuery } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type ResT = {
  total_products: number;
  total_invoices: number;
  total_revenue: number;
};

const fetchStatistics = async (): Promise<ResT> => {
  const { data } = await fetcher.get<ResT>("/stores/summary/");
  return data;
};

export const useStatistics = () => {
  return useQuery<ResT, ApiError>(["getStatistics"], fetchStatistics);
};
