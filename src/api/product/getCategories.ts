import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type CategoryT = {
  id: number;
  name: string;
};

type QueryKey = ["categories"];

const getCategories: QueryFunction<CategoryT[], QueryKey> = async () => {
  const { data: dataRes } = await fetcher.get<CategoryT[]>("/stores/category/");
  return dataRes;
};

export const useCategories = (options?: UseQueryOptions<CategoryT[], ApiError, CategoryT[], QueryKey>) => {
  return useQuery(["categories"], getCategories, options);
};
