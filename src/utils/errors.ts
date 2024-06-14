import { AxiosError } from "axios";
import { ApiErrorData } from "../api/config";
import { notif } from "../components/common/notification/Notification";

type ApiErrorHandlerOptions = {
  snackbarAll?: boolean;
};

export const handleApiErrors = (
  error: AxiosError<ApiErrorData>,
  setFieldError?: (field: string, value: string | undefined) => void,
  options?: ApiErrorHandlerOptions,
) => {
  const errorData = error.response?.data;
  const statusCode = error.response?.status;

  console.log("errorData", errorData);

  if (error.code === "ERR_NETWORK") {
    notif("No network connection!", { variant: "error" });
  } else if (errorData) {
    for (const key in errorData) {

      const errorMessages = errorData[key];
      errorMessages.forEach((errorMessage) => {
        notif(`${errorMessage} (field: ${key})`, { variant: "error" });
        if (setFieldError) {
          setFieldError(key, errorMessage);
        }
      });
    }
  } else if (statusCode && statusCode >= 500 && statusCode <= 599) {
    notif("Server is not available right now. Please try again later.", {
      variant: "error",
    });
  } else if (error.response?.statusText) {
    notif(error.response.statusText, { variant: "error" });
  }
};

const extractErrorMessages = (obj: object): string[] => {
  const errorMessages: string[] = [];

  if (typeof obj === "object") {
    // Iterate through keys of the object
    for (const key in obj) {
      // If the current key is 'errors' and its value is an array
      const objKey = key as keyof typeof obj;
      if (Array.isArray(obj[objKey])) {
        (obj[objKey] as Array<unknown>).forEach((error) => {
          if (typeof error === "object" && error !== null) {
            errorMessages.push(...extractErrorMessages(error));
          } else if (typeof error === "string") {
            errorMessages.push(error);
          }
        });
      } else {
        // If the current value is another object, recursively call the function
        extractErrorMessages(obj[objKey]);
      }
    }
  }

  return errorMessages;
};
