import { Request, Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { asyncHandler } from "../../utils/asyncHandler";
import { BookStatus } from "../../orm/entities/books/enums";
import { MoreThanOrEqual } from "typeorm";

export const getBookStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const totalBooks = await bookRepository.count();

    const availableBooks = await bookRepository.count({
      where: { status: BookStatus.AVAILABLE },
    });

    const outOfStockBooks = await bookRepository.count({
      where: { status: BookStatus.OUT_OF_STOCK },
    });

    const booksThisWeek = await bookRepository.count({
      where: { dateAdded: MoreThanOrEqual(sevenDaysAgo) },
    });

    const { totalValue } = await bookRepository
      .createQueryBuilder("book")
      .select("COALESCE(SUM(book.price * book.stock), 0)", "totalValue")
      .getRawOne();

    return res.customSuccess(200, "Book stats retrieved successfully", {
      totalBooks,
      availableBooks,
      outOfStockBooks,
      booksThisWeek,
      totalValue: Number(totalValue),
    });
  },
);
