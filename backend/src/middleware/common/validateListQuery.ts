import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "../../utils/response/custom-error/CustomError";

export const listQuerySchema = Joi.object({
  searchQuery: Joi.string().trim().allow("").optional(),
  pageNumber: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(5),
});

export const validateListQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = listQuerySchema.validate(req.query, {
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
