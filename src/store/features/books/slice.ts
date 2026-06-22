import { createSlice } from "@reduxjs/toolkit";
import type { BooksState } from "../../../types";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
  getBookStats,
  getCategories,
} from "./api";

const initialState: BooksState = {
  books: [],
  selectedBook: null,
  pagination: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  stats: {
    totalBooks: 0,
    booksThisWeek: 0,
    availableBooks: 0,
    outOfStockBooks: 0,
    totalValue: 0,
  },
  categories: [],

  fetchBooksStatus: "idle",
  fetchBookStatus: "idle",
  actionsStatus: "idle",
  error: null,

  categoriesPagination: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
    clearBooksError: (state) => {
      state.error = null;
    },
    resetBooksState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.actionsStatus = "loading";
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.actionsStatus = "succeeded";
        const newBook = action.payload;
        state.books.unshift(action.payload);

        state.pagination.totalItems += 1;
        if (state.books.length > state.pagination.pageSize) {
          state.books.pop();
        }

        state.stats.totalBooks += 1;
        state.stats.booksThisWeek += 1;
        state.stats.totalValue += newBook.price * newBook.stock;
        if (newBook.stock > 0) {
          state.stats.availableBooks += 1;
        } else {
          state.stats.outOfStockBooks += 1;
        }
      })
      .addCase(createBook.rejected, (state, action) => {
        state.actionsStatus = "failed";
        state.error = action.payload ?? { message: "Failed to create book!" };
      })

      .addCase(getBooks.pending, (state) => {
        state.fetchBooksStatus = "loading";
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.fetchBooksStatus = "succeeded";
        state.books = action.payload.books;
        state.pagination = action.payload.pagination;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.fetchBooksStatus = "failed";
        state.error = action.payload ?? { message: "Failed to fetch books!" };
      })

      .addCase(deleteBook.pending, (state) => {
        state.actionsStatus = "loading";
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.actionsStatus = "succeeded";
        const deletedBookId = action.payload;
        const bookToDelete = state.books.find((b) => b.id === deletedBookId);

        if (bookToDelete) {
          state.stats.totalBooks = Math.max(0, state.stats.totalBooks - 1);
          state.stats.totalValue = Math.max(
            0,
            state.stats.totalValue - bookToDelete.price * bookToDelete.stock,
          );
          if (bookToDelete.stock > 0) {
            state.stats.availableBooks = Math.max(
              0,
              state.stats.availableBooks - 1,
            );
          } else {
            state.stats.outOfStockBooks = Math.max(
              0,
              state.stats.outOfStockBooks - 1,
            );
          }

          const isAddedThisWeek =
            new Date().getTime() - new Date(bookToDelete.dateAdded).getTime() <
            7 * 24 * 60 * 60 * 1000;
          if (isAddedThisWeek) {
            state.stats.booksThisWeek = Math.max(
              0,
              state.stats.booksThisWeek - 1,
            );
          }
        }

        state.books = state.books.filter((b) => b.id !== deletedBookId);
        state.pagination.totalItems = Math.max(
          0,
          state.pagination.totalItems - 1,
        );
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalItems / state.pagination.pageSize,
        );

        if (state.selectedBook?.id === deletedBookId) {
          state.selectedBook = null;
        }
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.actionsStatus = "failed";
        state.error = action.payload ?? { message: "Failed to delete book!" };
      })

      .addCase(getBook.pending, (state) => {
        state.fetchBookStatus = "loading";
        state.error = null;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.fetchBookStatus = "succeeded";
        state.selectedBook = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.fetchBookStatus = "failed";
        state.error = action.payload ?? { message: "Book not found!" };
      })

      .addCase(updateBook.pending, (state) => {
        state.actionsStatus = "loading";
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.actionsStatus = "succeeded";
        const updatedBook = action.payload;
        const idx = state.books.findIndex((b) => b.id === updatedBook.id);
        const oldBook = idx !== -1 ? state.books[idx] : state.selectedBook;

        if (oldBook) {
          state.stats.totalValue +=
            updatedBook.price * updatedBook.stock -
            oldBook.price * oldBook.stock;

          const wasAvailable = oldBook.stock > 0;
          const isAvailable = updatedBook.stock > 0;

          if (wasAvailable && !isAvailable) {
            state.stats.availableBooks = Math.max(
              0,
              state.stats.availableBooks - 1,
            );
            state.stats.outOfStockBooks += 1;
          } else if (!wasAvailable && isAvailable) {
            state.stats.outOfStockBooks = Math.max(
              0,
              state.stats.outOfStockBooks - 1,
            );
            state.stats.availableBooks += 1;
          }
        }

        state.selectedBook = updatedBook;
        if (idx !== -1) {
          state.books[idx] = updatedBook;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.actionsStatus = "failed";
        state.error = action.payload ?? { message: "Failed to update book!" };
      })

      .addCase(getBookStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.categoriesPagination = action.payload.pagination;
      });
  },
});

export const { clearSelectedBook, resetBooksState } = bookSlice.actions;
export default bookSlice.reducer;
