import { Request, Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { asyncHandler } from "../../utils/asyncHandler";
import { MoreThanOrEqual } from "typeorm";

export const getDashboardKpis = asyncHandler(
  async (_req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const totalBooks = await bookRepository.count();

    const booksThisWeek = await bookRepository.count({
      where: { dateAdded: MoreThanOrEqual(sevenDaysAgo) },
    });

    return res.customSuccess(200, "Dashboard stats retrieved successfully", {
      totalBooks,
      booksThisWeek,
    });
  },
);
