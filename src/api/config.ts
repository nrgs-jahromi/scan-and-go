// import axios, { AxiosError } from "axios";
// import { API_BASE_URL } from "../vars/env";
// import { setInterceptors } from "./interceptors";

// export const fetcher = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// setInterceptors(fetcher);

// export type ApiErrorData = {
//   detail: {
//     non_field_error: string[];
//     [key: string]: string[];
//   };
// };

// export type ApiError = AxiosError<ApiErrorData>;


import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../vars/env";


export const fetcher = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type ApiErrorData = {
  detail: {
    non_field_error: string[];
    [key: string]: string[];
  };
};

export type ApiError = AxiosError<ApiErrorData>;