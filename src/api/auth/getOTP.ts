import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  body: {
    mobile_number: string;
  };
};

type ResT = {
  message: string;
  expire_time: string;
};
const getOTP: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(
    "/stores/sign-up/",
    data.body
  );
  return dataRes;
};

export const useGetOtp = () => {
  return useMutation<ResT, ApiError, DataT>(["getOTP"], getOTP);
};
