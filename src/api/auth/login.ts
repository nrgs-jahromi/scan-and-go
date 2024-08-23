import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type LoginDataT = {
  body: {
    mobile_number: string;
    password: string;
  };
};

type LoginResT = {
  token: string;
};

const loginUser: MutationFunction<LoginResT, LoginDataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<LoginResT>(
    "/stores/login/",
    data.body
  );
  return dataRes;
};

export const useLogin = () => {
  return useMutation<LoginResT, ApiError, LoginDataT>(["loginUser"], loginUser);
};
