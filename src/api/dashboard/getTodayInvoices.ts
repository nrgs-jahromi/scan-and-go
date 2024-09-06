import { ApiError, fetcher } from "../config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type InvoiceT = {
  invoice_number: string;
  customer_mobile_number: string;
  customer_full_name: string;
  total_amount: number;
  create_time:string;
};

type DailyInvoiceParamsT = {
  date: string;
};

const fetchDailyInvoices = async (params: DailyInvoiceParamsT): Promise<InvoiceT[]> => {
  const { data } = await fetcher.post<InvoiceT[]>("/stores/daily-invoice/", params);
  return data;
};

export const useDailyInvoices = (
  params: DailyInvoiceParamsT,
  options?: UseQueryOptions<InvoiceT[], ApiError>
) => {
  return useQuery<InvoiceT[], ApiError>(['dailyInvoices', params], () => fetchDailyInvoices(params), options);
};
