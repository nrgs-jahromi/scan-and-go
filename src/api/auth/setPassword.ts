import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  body: {
    mobile_number: string;
    password: string;
  };
};

type ResT = {
  message: string;
};

const setPassword: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(
    "/stores/set-password/",
    data.body
  );
  return dataRes;
};

export const useSetPassword = () => {
  return useMutation<ResT, ApiError, DataT>(["setPassword"], setPassword);
};
