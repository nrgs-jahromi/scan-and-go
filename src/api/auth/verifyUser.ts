import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  body: {
    mobile_number: string;
    verification_code: string;
  };
};

type ResT = null;

const verifyUser: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(
    "/stores/verify/",
    data.body
  );
  return dataRes;
};

export const useUserVerification = () => {
  return useMutation<ResT, ApiError, DataT>(["verifyUser"], verifyUser);
};
