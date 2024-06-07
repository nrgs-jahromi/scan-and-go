import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../vars/env";

export const fetcher = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// setInterceptors();

export type ApiErrorData = {
  detail: {
    non_field_error: string[];
    [key: string]: string[];
  };
};

export type ApiError = AxiosError<ApiErrorData>;
