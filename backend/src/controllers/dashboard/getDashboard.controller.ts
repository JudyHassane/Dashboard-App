import { Request, Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { asyncHandler } from "../../utils/asyncHandler";
import { MoreThan } from "typeorm";
import { BookStatus } from "../../orm/entities/books/enums";
import { Author } from "../../orm/entities/authors/author.entity";
import { ActivityLog } from "../../orm/entities/activity-logs/activity-log.entity";

export const getDashboard = asyncHandler(
  async (_req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);
    const authorRepository = AppDataSource.getRepository(Author);
    const activityLogRepository = AppDataSource.getRepository(ActivityLog);

    // Recent Books
    const recentBooksRaw = await bookRepository.find({
      relations: { author: true, category: true },
      order: { dateAdded: "DESC" },
      take: 5,
      select: {
        id: true,
        isbn: true,
        title: true,
        dateAdded: true,
        author: { id: true, name: true },
        category: { id: true, name: true },
      },
    });

    const recentBooks = recentBooksRaw.map((book) => ({
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      dateAdded: book.dateAdded,
      author: { id: book.author.id, name: book.author.name },
      category: { id: book.category.id, name: book.category.name },
    }));

    // Top Authors
    const topAuthorsRaw = await authorRepository
      .createQueryBuilder("author")
      .leftJoin("author.books", "book")
      .select("author.id", "id")
      .addSelect("author.name", "name")
      .addSelect("COUNT(book.id)", "booksCount")
      .groupBy("author.id")
      .addGroupBy("author.name")
      .orderBy('"booksCount"', "DESC")
      .limit(5)
      .getRawMany<{ id: number; name: string; booksCount: string }>();

    const topAuthors = topAuthorsRaw.map((row) => ({
      id: row.id,
      name: row.name,
      booksCount: Number(row.booksCount),
    }));

    // Category Chart
    const availableBooks = await bookRepository.find({
      where: { status: BookStatus.AVAILABLE },
      relations: { category: true },
      select: {
        id: true,
        category: {
          id: true,
          name: true,
        },
      },
    });

    const categoryMap: Record<
      number,
      { id: number; label: string; value: number }
    > = {};

    availableBooks.forEach((book) => {
      if (book.category) {
        const { id, name } = book.category;
        if (!categoryMap[id]) {
          categoryMap[id] = { id, label: name, value: 0 };
        }
        categoryMap[id].value += 1;
      }
    });

    const categoriesChart = Object.values(categoryMap).sort((a, b) =>
      a.label.localeCompare(b.label),
    );

    // Recent Activities
    const recentActivitiesRaw = await activityLogRepository.find({
      order: { createdAt: "DESC" },
      take: 5,
    });

    const recentActivities = recentActivitiesRaw.map((log) => ({
      id: log.id,
      action: log.action,
      message: log.message,
      createdAt: log.createdAt,
    }));

    // Top Choices
    const topBooks = await bookRepository.find({
      where: { stock: MoreThan(5) },
      relations: { author: true },
      order: { stock: "DESC" },
      take: 10,
      select: {
        id: true,
        title: true,
        coverImage: true,
        stock: true,
        author: {
          id: true,
          name: true,
        },
      },
    });

    const topChoices = topBooks.map((book) => ({
      id: book.id,
      title: book.title,
      coverImage: book.coverImage,
      author: {
        id: book.author.id,
        name: book.author.name,
      },
    }));

    res.customSuccess(200, "Dashboard data retrieved successfully", {
      topAuthors,
      recentBooks,
      categoriesChart,
      recentActivities,
      topChoices,
    });
  },
);
