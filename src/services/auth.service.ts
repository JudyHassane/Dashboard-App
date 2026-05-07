import axios from "../lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types";
import { tokenService } from "./token.service";
import { extractApiError } from "../utils/api-error";

// API CALLS

export const authService = {
  async registerAPI(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        "/auth/register",
        payload,
      );
      tokenService.setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      throw extractApiError(error, "Registration failed");
    }
  },

  async loginAPI(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>("/auth/login", payload);
      tokenService.setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      throw extractApiError(error, "Login failed");
    }
  },

  async logoutAPI(): Promise<void> {
    try {
      await axios.post("/auth/logout");
    } catch (error) {
      throw extractApiError(error, "Logout failed");
    } finally {
      tokenService.clearAccessToken();
    }
  },

  // Get current user
  async getCurrentUserAPI(): Promise<User> {
    try {
      const response = await axios.get("/users/me");
      return response.data;
    } catch (error) {
      throw extractApiError(error, "Failed to fetch user");
    }
  },
};
