import { Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { BookRequest } from "../../types/book.types";
import { asyncHandler } from "../../utils/asyncHandler";
import { NotFoundError } from "../../utils/response/custom-error/CustomError";
import { logActivity } from "../../utils/logActivity";
import { ActivityAction } from "../../orm/entities/activity-logs/enums";

export const deleteBook = asyncHandler(
  async (req: BookRequest, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!book) {
      throw new NotFoundError("Book not found");
    }

    await bookRepository.softRemove(book);

    await logActivity({
      action: ActivityAction.BOOK_DELETED,
      message: `Book "${book.title}" deleted successfully`,
      entityId: book.id,
      userId: req.userId,
    });

    return res.customSuccess(200, "Book deleted successfully");
  },
);
