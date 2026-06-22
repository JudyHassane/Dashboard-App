import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axios";
import type { AppError } from "../../../utils/api-error";
import { extractApiError } from "../../../utils/api-error";

import type { ApiSuccessResponse } from "../../../types/api.types";
import type {
  Book,
  BookPayload,
  BookStats,
  GetBooksParams,
  GetBooksResponse,
  UploadImageResponse,
} from "../../../types";
import { endpoints } from "../../../services/constants";
import type {
  GetCategoriesParams,
  GetCategoriesResponse,
} from "../../../types/categories.types";

const BookAPI = endpoints.app.books;
const CategoryAPI = endpoints.app.categories;
const UploadAPI = endpoints.uploads.bookCover;

export const createBook = createAsyncThunk<
  Book,
  BookPayload,
  { rejectValue: AppError }
>("books/create", async (bookData, thunkAPI) => {
  try {
    const response = await axios.post<ApiSuccessResponse<{ book: Book }>>(
      BookAPI,
      bookData,
    );
    return response.data.data.book;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to create book"),
    );
  }
});

export const getBooks = createAsyncThunk<
  GetBooksResponse,
  GetBooksParams | undefined,
  { rejectValue: AppError }
>("books/getAll", async (params, thunkAPI) => {
  try {
    const response = await axios.get<ApiSuccessResponse<GetBooksResponse>>(
      BookAPI,
      { params },
    );
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to fetch books"),
    );
  }
});

export const getBookStats = createAsyncThunk<
  BookStats,
  void,
  { rejectValue: AppError }
>("books/getBookStats", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiSuccessResponse<BookStats>>(
      `${BookAPI}/stats`,
    );

    return response.data.data;
  } catch (error) {
    return rejectWithValue(extractApiError(error));
  }
});

export const deleteBook = createAsyncThunk<
  number,
  number,
  { rejectValue: AppError }
>("books/deleteBook", async (id, thunkAPI) => {
  try {
    await axios.delete(`${BookAPI}/${id}`);

    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to delete book"),
    );
  }
});

export const getBook = createAsyncThunk<
  Book,
  number,
  { rejectValue: AppError }
>("books/getOne", async (id, thunkAPI) => {
  try {
    const response = await axios.get<ApiSuccessResponse<{ book: Book }>>(
      `${BookAPI}/${id}`,
    );

    return response.data.data.book;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to fetch book"),
    );
  }
});

export const updateBook = createAsyncThunk<
  Book,
  { id: number; payload: BookPayload },
  { rejectValue: AppError }
>("books/updateBook", async ({ id, payload }, thunkAPI) => {
  try {
    const response = await axios.put<ApiSuccessResponse<{ book: Book }>>(
      `${BookAPI}/${id}`,
      payload,
    );

    return response.data.data.book;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to update book"),
    );
  }
});

export const getCategories = createAsyncThunk<
  GetCategoriesResponse,
  GetCategoriesParams | undefined,
  { rejectValue: AppError }
>("books/getCategories", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiSuccessResponse<GetCategoriesResponse>>(
      CategoryAPI,
      {
        params,
      },
    );

    return response.data.data;
  } catch (error) {
    return rejectWithValue(extractApiError(error));
  }
});

export const uploadBookCover = createAsyncThunk<
  UploadImageResponse,
  File,
  { rejectValue: AppError }
>("books/uploadCover", async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(UploadAPI, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data.image;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      extractApiError(error, "Failed to upload cover"),
    );
  }
});
