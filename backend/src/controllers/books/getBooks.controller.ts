import { Request, Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { asyncHandler } from "../../utils/asyncHandler";
import { GetBooksQuery } from "../../types/book.types";
import { getImageUrl } from "../../utils/imageUrl";
import { FindOptionsWhere, ILike, FindOptionsOrder } from "typeorm";
import { BookStatus } from "../../orm/entities/books/enums";

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const {
    searchQuery,
    pageNumber,
    pageSize,
    sortBy,
    sortOrder,
    category,
    status,
  } = req.query as unknown as GetBooksQuery;

  const skip = (pageNumber - 1) * pageSize;

  const baseConditions: FindOptionsWhere<Book> = {
    ...(status && { status: status as BookStatus }),
    ...(category && { category: { name: category } }),
  };

  const where: FindOptionsWhere<Book> | FindOptionsWhere<Book>[] = searchQuery
    ? [
        { ...baseConditions, title: ILike(`%${searchQuery}%`) },
        { ...baseConditions, isbn: ILike(`%${searchQuery}%`) },
      ]
    : baseConditions;

  const sortFieldMap: Record<string, keyof Book> = {
    title: "title",
    price: "price",
    stock: "stock",
    dateAdded: "dateAdded",
  };

  const sortKey =
    sortBy && sortFieldMap[sortBy] ? sortFieldMap[sortBy] : "dateAdded";
  const order: FindOptionsOrder<Book> = {
    [sortKey]: sortOrder ? (sortOrder.toUpperCase() as "ASC" | "DESC") : "DESC",
  };

  const [books, totalItems] = await bookRepository.findAndCount({
    where,
    relations: {
      category: true,
      author: true,
    },
    order,
    skip,
    take: pageSize,
  });

  const booksWithImageUrls = books.map((book) => ({
    ...book,
    coverImageUrl: getImageUrl(book.coverImage),
  }));

  return res.customSuccess(200, "Books retrieved successfully", {
    books: booksWithImageUrls,
    pagination: {
      pageNumber,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    },
  });
});
