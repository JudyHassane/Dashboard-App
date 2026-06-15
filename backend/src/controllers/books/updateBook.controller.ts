import { Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { BookRequest } from "../../types/book.types";
import { asyncHandler } from "../../utils/asyncHandler";
import { NotFoundError } from "../../utils/response/custom-error/CustomError";

export const updateBook = asyncHandler(
  async (req: BookRequest, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!book) {
      throw new NotFoundError("Book not found");
    }

    bookRepository.merge(book, req.body);

    const updatedBook = await bookRepository.save(book);

    return res.customSuccess(200, "Book updated successfully", {
      book: updatedBook,
    });
  },
);
