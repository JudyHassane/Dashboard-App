import type { InternalAxiosRequestConfig } from "axios";

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  suppressToast?: boolean;
};

export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RefreshResponse {
  accessToken: string;
}
