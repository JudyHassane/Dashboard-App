import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { listQuerySchema } from "../../common/validateListQuery";
import { BadRequestError } from "../../../utils/response/custom-error/CustomError";

const bookListQuerySchema = listQuerySchema.keys({
  sortBy: Joi.string().valid("title", "price", "stock", "dateAdded"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  category: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("available", "out of stock").optional(),
});

export const validateBookListQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = bookListQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }

  req.query = value;

  next();
};
