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
    create_time__gte?: string;
    create_time__lte?: string;
    search?: string;
  };
};

export type InvoiceData = {
  invoice_number: string;
  customer_phone:string;
  date_time: string;
  total_price: number;
};

type ResT = {
  count: number;
  next: string | null;
  previous: string | null;
  results: InvoiceData[];
};

type QueryKey = ["invoices", DataT];

const fetchInvoices: QueryFunction<ResT, QueryKey> = async ({ queryKey }) => {
  const {
    page = 1,
    page_size = 10,
    create_time__gte = "",
    create_time__lte = "",
    search= "",
  } = queryKey[1].params;
  const { data: dataRes } = await fetcher.get<ResT>("/invoices/list", {
    params: { page, page_size, create_time__gte, create_time__lte, search },
  });
  return dataRes;
};

export const useInvoices = (
  data: DataT,
  options:
    | UseQueryOptions<ResT, ApiError, ResT, QueryKey>
    | undefined = undefined
) => {
  return useQuery<ResT, ApiError, ResT, QueryKey>(
    ["invoices", data],
    fetchInvoices,
    options
  );
};
