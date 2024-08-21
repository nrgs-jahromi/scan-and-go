import { AxiosError, AxiosInstance } from "axios";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from "../constants/localStorage";
import { refreshAccessToken } from "./auth/refreshToken";
import { ENV_MODE } from "../vars/env";

let isRefreshing = false;
let failedQueue: {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });

  failedQueue = [];
};

let retryCount = 0;
const MAX_RETRY = 2; // Maximum number of retry attempts

const navigateToLoginScreen = () => {
  // window.location.replace("/auth/login");
};

export const setInterceptors = (fetcher: AxiosInstance) => {
  fetcher.interceptors.request.use(
    async (config) => {
      const accessToken = getFromLocalStorage(LS_ACCESS_TOKEN);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (ENV_MODE === "PROD") {
        config.headers["Cache-Control"] = "no-cache";
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  fetcher.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;
      const refreshToken = getFromLocalStorage(LS_REFRESH_TOKEN);

      if (!refreshToken) {
        deleteFromLocalStorage(LS_ACCESS_TOKEN);
        navigateToLoginScreen();
      } else if (
        error.response?.status === 401 &&
        retryCount < MAX_RETRY &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "code" in error.response.data &&
        ["token_not_valid", "not_authenticated"].includes(error.response.data.code as string) &&
        originalRequest &&
        refreshToken
      ) {
        if (originalRequest.url === "/auth/refresh/") {
          deleteFromLocalStorage(LS_ACCESS_TOKEN);
          deleteFromLocalStorage(LS_REFRESH_TOKEN);
          navigateToLoginScreen();
        } else {
          if (!isRefreshing) {
            isRefreshing = true;
            retryCount++;

            try {
              const { access } = await refreshAccessToken({ body: { refresh: refreshToken } });
              saveToLocalStorage(LS_ACCESS_TOKEN, access);
              processQueue(null, access);
              return fetcher(originalRequest);
            } catch (err) {
              processQueue(err as AxiosError, null);
              return Promise.reject(err);
            } finally {
              retryCount = 0;
              isRefreshing = false;
            }
          } else {
            return new Promise<string>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
          }
        }
      }

      return Promise.reject(error);
    }
  );
};
