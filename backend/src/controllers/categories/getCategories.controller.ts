import { Request, Response } from "express";
import { AppDataSource } from "../../orm/config/ormconfig";
import { asyncHandler } from "../../utils/asyncHandler";
import { Category } from "../../orm/entities/categories/category.entity";
import { GetCategoriesQuery } from "../../types/category.types";
import { ILike } from "typeorm";

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const {
      searchQuery = "",
      pageNumber = 1,
      pageSize = 5,
    } = req.query as unknown as GetCategoriesQuery;

    const skip = (pageNumber - 1) * pageSize;

    const [categories, totalItems] = await categoryRepository.findAndCount({
      where: searchQuery ? { name: ILike(`%${searchQuery}%`) } : {},
      order: { name: "ASC" },
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return res.customSuccess(200, "Categories retrieved successfully", {
      categories,
      pagination: { pageNumber, pageSize, totalItems, totalPages },
    });
  },
);
