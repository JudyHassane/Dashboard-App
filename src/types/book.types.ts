import type { AppError } from "../utils/api-error";
import type { Category } from "./categories.types";

export type BookStatus = "available" | "out of stock";

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  price: number;
  stock: number;
  status: BookStatus;
  description?: string;
  coverImage: string;
  coverImageUrl?: string;
  dateAdded: string;
}

export interface BookPayload {
  title: string;
  author: string;
  isbn: string;
  description?: string;
  categoryName: string;
  coverImage: string;
  price: number;
  stock: number;
}

export type SortByField = "title" | "price" | "stock" | "dateAdded";
export type SortOrder = "asc" | "desc";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  pagination: Pagination;
  categories: Category[];

  stats: BookStats;

  fetchBooksStatus: RequestStatus;
  fetchBookStatus: RequestStatus;
  actionsStatus: RequestStatus;
  error: AppError | null;

  categoriesPagination: Pagination;
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export interface BookStats {
  totalBooks: number;
  booksThisWeek: number;
  availableBooks: number;
  outOfStockBooks: number;
  totalValue: number;
}

export const emptyBook: BookPayload = {
  title: "",
  author: "",
  isbn: "",
  description: "",
  categoryName: "",
  coverImage: "",
  price: 0,
  stock: 0,
};

export interface GetBooksParams {
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortByField | null;
  sortOrder?: SortOrder;
  category?: string;
  status?: string;
}

export interface GetBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export interface UploadImageResponse {
  filename: string;
  storageKey: string;
  mimeType: string;
  size: number;
}
