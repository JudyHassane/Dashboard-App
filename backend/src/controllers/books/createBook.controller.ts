import { AppDataSource } from "../../orm/config/ormconfig";
import { Book } from "../../orm/entities/books/book.entity";
import { BookRequest } from "../../types/book.types";
import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Category } from "../../orm/entities/categories/category.entity";
import { Author } from "../../orm/entities/authors/author.entity";

export const createBook = asyncHandler(
  async (req: BookRequest, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);
    const categoryRepository = AppDataSource.getRepository(Category);
    const authorRepository = AppDataSource.getRepository(Author);

    const {
      title,
      author,
      isbn,
      description,
      coverImage,
      price,
      stock,
      categoryName,
    } = req.body;
    let category = await categoryRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      category = categoryRepository.create({ name: categoryName });
      category = await categoryRepository.save(category);
    }

    let bookAuthor = await authorRepository.findOne({
      where: { name: author },
    });

    if (!bookAuthor) {
      bookAuthor = authorRepository.create({ name: author });
      bookAuthor = await authorRepository.save(bookAuthor);
    }

    const newBook = bookRepository.create({
      title,
      isbn,
      description,
      coverImage,
      price,
      stock,
      category,
      author: bookAuthor,
    });
    const savedBook = await bookRepository.save(newBook);

    return res.customSuccess(201, "Book created successfully", {
      book: savedBook,
    });
  },
);
