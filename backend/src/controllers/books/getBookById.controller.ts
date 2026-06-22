import { Response } from "express";
import { BookRequest } from "../../types/book.types";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { NotFoundError } from "../../utils/response/custom-error/CustomError";

export const getBookById = asyncHandler(
  async (req: BookRequest, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOneBy({ id: Number(req.params.id) });

    if (!book) {
      throw new NotFoundError("Book not found");
    }

    return res.customSuccess(200, "Book retrieved successfully", {
      book,
    });
  },
);
