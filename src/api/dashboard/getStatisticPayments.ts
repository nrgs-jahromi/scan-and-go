import { useQuery, QueryFunction, UseQueryOptions } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DailySalesResponse = { [key: string]: number }[];

type QueryKey = ["dailySales", { start: string, end: string }];

const fetchData: QueryFunction<DailySalesResponse, QueryKey> = async ({ queryKey }) => {
  const { start, end } = queryKey[1];
  const { data } = await fetcher.post<DailySalesResponse>("/stores/daily-sales/", {
    start_date: start,
    end_date: end
  });
  return data;
};

export const useDailySales = (
  start: string,
  end: string,
  options: UseQueryOptions<DailySalesResponse, ApiError, DailySalesResponse, QueryKey> | undefined = undefined
) => {
  return useQuery<DailySalesResponse, ApiError, DailySalesResponse, QueryKey>(
    ["dailySales", { start, end }],
    fetchData,
    options
  );
};
