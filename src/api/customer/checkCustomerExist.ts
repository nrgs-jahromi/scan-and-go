import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

// Define the data types
type DataT = {
  body: {
    customer_national_code: string;
  };
};

type ResT = {
  customer: string;
  is_exist: boolean;
};

// Define the mutation function
const checkCustomer: MutationFunction<ResT, DataT> = async (data) => {
  
  const { data: dataRes } = await fetcher.post<ResT>(
    "/process/66597406718ba4fa2dd283f9/",
    data.body
  );
  return dataRes;
};

// Custom hook to use the mutation
export const useCustomerRegistered = () => {
  return useMutation<ResT, ApiError, DataT>(["checkCustomer"], checkCustomer);
};
