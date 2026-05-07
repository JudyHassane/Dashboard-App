import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../../../types";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "./api";

const initialState: AuthState = {
  user: null,
  authStatus: "unknown",
  actionStatus: "idle",
  error: null,
  lastFetchedTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user credentials after successful authentication
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.actionStatus = "succeeded";
      state.authStatus = "authenticated";
      state.error = null;
      state.lastFetchedTime = Date.now();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Clear all auth state (used on logout or forced reset)
    clearAuth: (state) => {
      state.user = null;
      state.actionStatus = "idle";
      state.authStatus = "unauthenticated";
      state.error = null;
      state.lastFetchedTime = null;
    },
  },

  extraReducers: (builder) => {
    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.authStatus = "authenticated";
        state.user = action.payload.user;
        state.error = null;
        state.lastFetchedTime = Date.now();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload ?? { message: "Registration failed" };
      });

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.authStatus = "authenticated";
        state.user = action.payload.user;
        state.error = null;
        // Update cache timestamp on successful login
        state.lastFetchedTime = Date.now();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.authStatus = "unauthenticated";
        state.error = action.payload ?? { message: "Login failed" };
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.actionStatus = "idle";
        state.authStatus = "unauthenticated";
        state.error = null;
        state.lastFetchedTime = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload ?? { message: "Logout failed" };
      });

    // Get current user (silent session check - errors are expected when not logged in)
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.authStatus = "unknown";
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.authStatus = "authenticated";
        state.user = action.payload;
        state.error = null;
        // Refresh cache timestamp after fetching fresh data
        state.lastFetchedTime = Date.now();
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.authStatus = "unauthenticated";
        state.user = null;
        state.actionStatus = "failed";
        if (
          action.payload?.statusCode !== 401 &&
          action.payload?.statusCode !== 403
        ) {
          state.error = action.payload ?? { message: "Session check failed" };
        } else {
          state.error = null;
        }
      });
  },
});

export const { setCredentials, clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
