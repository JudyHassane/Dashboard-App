import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../../services/auth.service";
import type {
  User,
  AuthState,
  AuthResponse,
  RegisterPayload,
  LoginPayload,
} from "../../../types";
import type { AppError } from "../../../utils/api-error";

// CACHE_DURATION defines how long user data is considered fresh
// After this duration, data is considered outdated and can be re-fetched

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Returned Payload Type, Argument Type, Rejected Value Type
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: AppError }
>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      return await authService.registerAPI(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AppError);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };
      if (state.auth.actionStatus === "loading") return false; // Prevent duplicate registration requests
      if (state.auth.authStatus === "authenticated") return false;
      if (state.auth.user) return false; // Prevent registration if already logged in
      return true;
    },
  },
);

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: AppError }
>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await authService.loginAPI(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AppError);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };
      if (state.auth.actionStatus === "loading") return false;
      if (state.auth.authStatus === "authenticated") return false;
      if (state.auth.user) return false;
      return true;
    },
  },
);

export const logoutUser = createAsyncThunk<
  null,
  void,
  { rejectValue: AppError }
>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logoutAPI();
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AppError);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };
      if (state.auth.actionStatus === "loading") return false; // Prevent duplicate calls
      return true;
    },
  },
);

export const getCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: AppError }
>(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await authService.getCurrentUserAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AppError);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };
      if (state.auth.authStatus === "unknown") {
        return true;
      }

      // Caching
      if (state.auth.user && state.auth.lastFetchedTime) {
        const timePassed = Date.now() - state.auth.lastFetchedTime;
        const isCacheValid = timePassed < CACHE_DURATION;

        if (isCacheValid) {
          return false;
        }
      }

      return true;
    },
  },
);
