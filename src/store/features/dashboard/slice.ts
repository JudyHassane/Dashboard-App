import { createSlice } from "@reduxjs/toolkit";
import { getDashboardData, getDashboardKpis } from "./api";
import type { DashboardState } from "../../../types/dashboard.types";

const initialState: DashboardState = {
  categoriesChart: [],
  topChoices: [],
  recentBooks: [],
  topAuthors: [],
  recentActivities: [],
  kpis: {
    totalBooks: 0,
    booksThisWeek: 0,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.categoriesChart = action.payload.categoriesChart;
        state.topChoices = action.payload.topChoices;
        state.recentBooks = action.payload.recentBooks;
        state.topAuthors = action.payload.topAuthors;
        state.recentActivities = action.payload.recentActivities;
      })
      .addCase(getDashboardKpis.fulfilled, (state, action) => {
        state.kpis = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
