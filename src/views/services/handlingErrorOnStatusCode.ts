import { AxiosError } from "axios";

const handlingErrorOnStatusCode = (error: unknown) => {
  let message = "An unexpected error occurred. Please try again.";

  if (error instanceof AxiosError) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      switch (error.response.status) {
        case 400:
          message = "Invalid request. Please check your input.";
          break;
        case 401:
          message = "Unauthorized. Please log in and try again.";
          break;
        case 403:
          message = "Access denied. You do not have permission.";
          break;
        case 404:
          message = "The requested resource was not found.";
          break;
        case 422:
          message = "Validation failed. Please check the form fields.";
          break;
        case 500:
          message = "Server error. Please try again later.";
          break;
        default:
          message =
            error.response.data?.message ||
            "An error occurred. Please try again.";
      }
    } else if (error.request) {
      // Request was made but no response received
      message = "Network error. Please check your internet connection.";
    } else {
      // Something happened in setting up the request
      message = error.message || "An error occurred while sending the request.";
    }
  }

  return message;
};

export default handlingErrorOnStatusCode;
