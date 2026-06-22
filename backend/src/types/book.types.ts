import { Book } from "../orm/entities/books/book.entity";
import { Request } from "express";

export interface BookRequest extends Request {
  book?: Book;
  userId?: number;
}

export type GetBooksQuery = {
  searchQuery: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortOrder: "asc" | "desc";
  category?: string;
  status?: string;
};
