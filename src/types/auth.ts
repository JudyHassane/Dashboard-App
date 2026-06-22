import type { AppError } from "../utils/api-error";

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  authStatus: "unknown" | "authenticated" | "unauthenticated";
  actionStatus: "idle" | "loading" | "succeeded" | "failed";
  error: AppError | null;
  lastFetchedTime: number | null;
}

export interface AuthScreenProps {
  mode: "login" | "register";
  layoutTitle: string;
  layoutSubtitle: string;
  formTitle: string;
  formSubtitle: string;
}
