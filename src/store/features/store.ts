import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import bookReducer from "./books/slice";
import dashboardReducer from "./dashboard/slice";

// Global State - Holds the entire state of the app
export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
