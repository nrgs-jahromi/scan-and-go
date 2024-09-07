import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  params: {
    page?: number;
    page_size?: number;
    q?: string;
  };
};

export type CustomerData = {
  mobile_number:string;
  username:string;
  first_name:string|null;
  last_name:string|null;
  gender:"F"|"M"|"O";
  birth_date:string|null;
  purchase_count:number;
};

type ResT = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomerData[];
};

type QueryKey = ["customers", DataT];

const fetchCustomers: QueryFunction<ResT, QueryKey> = async ({ queryKey }) => {
  const { page = 1, page_size = 10, q = "" } = queryKey[1].params;
  const { data: dataRes } = await fetcher.get<ResT>("/stores/customers/", {
    params: { page, page_size, q },
  });
  return dataRes;
};

export const useCustomers = (
  data: DataT,
  options:
    | UseQueryOptions<ResT, ApiError, ResT, QueryKey>
    | undefined = undefined
) => {
  return useQuery<ResT, ApiError, ResT, QueryKey>(
    ["customers", data],
    fetchCustomers,
    options
  );
};
