import { Router } from "express";
import { validateBook } from "../middleware/books/schema/book.validator";
import { checkIsbnConflict } from "../middleware/books/db/isbnExists.middleware";
import { createBook } from "../controllers/books/createBook.controller";
import { getBooks } from "../controllers/books/getBooks.controller";
import { getBookById } from "../controllers/books/getBookById.controller";
import { updateBook } from "../controllers/books/updateBook.controller";
import { deleteBook } from "../controllers/books/deleteBook.controller";
import { validateBookListQuery } from "../middleware/books/schema/bookListQuery.validator";
import { getBookStats } from "../controllers/books/getBooksStats.controller";

const router = Router();

router.post("/", validateBook, checkIsbnConflict, createBook);
router.get("/", validateBookListQuery, getBooks);
router.delete("/:id(\\d+)", deleteBook);
router.get("/:id(\\d+)", getBookById);

router.get("/stats", getBookStats);

router.put("/:id(\\d+)", validateBook, checkIsbnConflict, updateBook);

export default router;
