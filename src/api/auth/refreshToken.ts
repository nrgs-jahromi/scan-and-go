import { MutationFunction } from "@tanstack/react-query";
import { fetcher } from "../config";

type DataT = {
  body: {
    refresh: string;
  };
};

type ResT = {
  access: string;
};

export const refreshAccessToken: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(`/auth/token/refresh/`, data.body);
  return dataRes;
};
