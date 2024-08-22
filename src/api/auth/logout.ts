import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type ResT = {
  message: string;
};

const logout: MutationFunction<ResT, void> = async () => {
  const { data: dataRes } = await fetcher.post<ResT>("/stores/logout/");
  return dataRes;
};

export const useLogout = () => {
  return useMutation<ResT, ApiError, void>(["logout"], logout);
};
