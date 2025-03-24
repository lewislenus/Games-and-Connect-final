import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("token");
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     console.error("Request Error:", error.message);
//     return Promise.reject({
//       message: "Failed to send request",
//       code: error.code,
//     } as ApiError);
//   }
// ); 



// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: "An error occurred",
      status: error.response?.status,
      code: error.code,
    };

    if (!error.response) {
      apiError.message = "Network error - please check your connection";
    } else {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          apiError.message = "Session expired - please login again";
          break;
        case 403:
          apiError.message = "You don't have permission to perform this action";
          break;
        case 404:
          apiError.message = "Requested resource not found";
          break;
        case 422:
          apiError.message = "Invalid data provided";
          break;
        case 500:
          apiError.message = "Server error - please try again later";
          break;
        default:
          apiError.message =
            (error.response.data as { message?: string })?.message ||
            "Something went wrong";
      }
    }

    console.error("API Error:", apiError);
    return Promise.reject(apiError);
  }
);

export default api;
