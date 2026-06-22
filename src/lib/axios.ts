import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { tokenService } from "../services/token.service";
import type {
  ApiSuccessResponse,
  RefreshResponse,
  RetryableRequestConfig,
} from "../types/api.types";
import { ENV } from "../config/env";
import { extractApiError } from "../utils/api-error";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: ENV.serverUrl,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error: AxiosError) => Promise.reject(error),
);

// Stores waiting failed requests - Waiting Room
let isRefreshing = false; // Only ONE refresh request happens at a time in case many requests fail at the same time
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

// Response Interceptor - handles errors globally and refreshes access token on 401
axiosInstance.interceptors.response.use(
  (response) => response,

  // runs only when request fails
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const statusCode = error.response?.status;
    const requestUrl = originalRequest.url ?? "";

    // Check if the request is for register, login, or refresh
    const isAuthEndpoint =
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");

    // Handle 401
    if (statusCode === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      // If another refresh request is already in progress, wait for it to complete
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (queueError: unknown) => reject(queueError),
          });
        });
      }

      // Start the refresh process
      isRefreshing = true;

      try {
        const refreshResponse =
          await axiosInstance.post<ApiSuccessResponse<RefreshResponse>>(
            "/auth/refresh",
          );
        const newAccessToken = refreshResponse.data.data.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }
        tokenService.setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenService.clearAccessToken();
        delete axiosInstance.defaults.headers.common.Authorization;
        window.dispatchEvent(new Event("session-expired"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Global Error Toast for all other error statuses
    const { message } = extractApiError(error, "Something went wrong!");

    // Silent endpoints — errors here are expected and normal, don't show a toast.
    const isSilentEndpoint =
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");

    if (!isSilentEndpoint) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
