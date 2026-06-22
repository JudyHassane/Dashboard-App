import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../orm/config/ormconfig";
import { Book } from "../../../orm/entities/books/book.entity";
import { ConflictError } from "../../../utils/response/custom-error/CustomError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { Not } from "typeorm";

export const checkIsbnConflict = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const existingBook = await bookRepository.findOne({
      where: {
        isbn: req.body.isbn,
        ...(req.params.id && {
          id: Not(Number(req.params.id)),
        }),
      },
    });

    if (existingBook) {
      throw new ConflictError("Book with this ISBN already exists");
    }

    next();
  },
);
