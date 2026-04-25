import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/CustomError";

export const validator =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: true });

    if (error) {
      return next(new BadRequestError(error.details[0].message));
    }
    req.body = value;
    next();
  };
