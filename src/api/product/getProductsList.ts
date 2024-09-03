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

export type ProductData = {
  barcode: string;
  name: string;
  price: string;
  stock: number | null;
  brand: null | string;
  primary_image_url: string | null;
  category_names: string[] ;
};

type ResT = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductData[];
};

type QueryKey = ["products", DataT];

const fetchProducts: QueryFunction<ResT, QueryKey> = async ({ queryKey }) => {
  const { page = 1, page_size = 10  , q = ""} = queryKey[1].params;
  const { data: dataRes } = await fetcher.get<ResT>("/products/list", {
    params: { page, page_size , q },
  });
  return dataRes;
};

export const useProducts = (
  data: DataT,
  options:
    | UseQueryOptions<ResT, ApiError, ResT, QueryKey>
    | undefined = undefined
) => {
  return useQuery<ResT, ApiError, ResT, QueryKey>(
    ["products", data],
    fetchProducts,
    options
  );
};
