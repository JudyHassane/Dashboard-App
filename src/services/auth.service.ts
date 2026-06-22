import axios from "../lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types";
import type { ApiSuccessResponse } from "../types/api.types";
import { tokenService } from "./token.service";
import { extractApiError } from "../utils/api-error";
import { endpoints } from "./constants";

const API = endpoints.auth;

export const authService = {
  async registerAPI(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiSuccessResponse<AuthResponse>>(
        API.register,
        payload,
      );
      tokenService.setAccessToken(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      throw extractApiError(error, "Registration failed");
    }
  },

  async loginAPI(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiSuccessResponse<AuthResponse>>(
        API.login,
        payload,
      );
      tokenService.setAccessToken(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      throw extractApiError(error, "Login failed");
    }
  },

  async logoutAPI(): Promise<void> {
    try {
      await axios.post(API.logout);
    } catch (error) {
      throw extractApiError(error, "Logout failed");
    } finally {
      tokenService.clearAccessToken();
    }
  },

  async getCurrentUserAPI(): Promise<User> {
    try {
      const response = await axios.get<ApiSuccessResponse<{ user: User }>>(
        API.me,
      );
      return response.data.data.user;
    } catch (error) {
      throw extractApiError(error, "Failed to fetch user");
    }
  },
};
