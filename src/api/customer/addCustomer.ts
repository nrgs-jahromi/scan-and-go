import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

// Define the data types
type DataT = {
  body: CustomerFormT;
};

type ResT = null;

// Define the mutation function
const addUser: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(
    "/process/6659cecc7e7017b595b7e415/",
    data.body
  );
  return dataRes;
};

// Custom hook to use the mutation
export const useUserRegistration = () => {
  return useMutation<ResT, ApiError, DataT>(["addUser"], addUser);
};
