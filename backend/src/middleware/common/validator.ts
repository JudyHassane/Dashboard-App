import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/response/custom-error/CustomError";

export const validator =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const validationErrors: Record<string, string> = {};

      error.details.forEach((detail) => {
        const field = detail.path.join(".");

        validationErrors[field] = detail.message;
      });

      return next(new ValidationError(validationErrors));
    }
    req.body = value;
    return next();
  };
