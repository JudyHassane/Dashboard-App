import { AxiosError } from "axios";

// Standardized error shape used across the entire frontend.
// Every API error gets converted to this shape before reaching Redux or UI.

export interface AppError {
  message: string;
  statusCode?: number;
}

export function extractApiError(
  error: unknown,
  fallback: string = "Something went wrong",
): AppError {
  // Case 1: Axios error with a response from the server
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as { message?: string } | undefined;
    return {
      message: data?.message || error.message || fallback,
      statusCode: error.response.status,
    };
  }

  // Case 2: Axios error without a response (network error, timeout, etc.)
  if (error instanceof AxiosError) {
    return {
      message: error.message || "Network error. Please check your connection.",
    };
  }

  // Case 3: Regular TS Error
  if (error instanceof Error) {
    return {
      message: error.message || fallback,
    };
  }

  // Case 4: Unknown error type
  return { message: fallback };
}
