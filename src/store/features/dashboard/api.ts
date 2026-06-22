import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardData, DashboardKpis } from "../../../types";
import type { ApiSuccessResponse } from "../../../types/api.types";
import axios from "../../../lib/axios";
import { extractApiError, type AppError } from "../../../utils/api-error";
import { endpoints } from "../../../services/constants";

const DashboardAPI = endpoints.app.dashboard;

export const getDashboardData = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: AppError }
>("books/getDashboardData", async (_, thunkAPI) => {
  try {
    const response =
      await axios.get<ApiSuccessResponse<DashboardData>>(DashboardAPI);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to fetch dashboard data"),
    );
  }
});

export const getDashboardKpis = createAsyncThunk<
  DashboardKpis,
  void,
  { rejectValue: AppError }
>("dashboard/getDashboardKpis", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiSuccessResponse<DashboardKpis>>(
      `${DashboardAPI}/kpis`,
    );

    return response.data.data;
  } catch (error) {
    return rejectWithValue(extractApiError(error));
  }
});
