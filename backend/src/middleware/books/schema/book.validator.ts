import Joi from "joi";
import { validator } from "../../common/validator";

const bookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  author: Joi.string().trim().min(1).max(255).required(),
  isbn: Joi.string()
    .trim()
    .pattern(/^\d{13}$/)
    .required(),
  description: Joi.string().trim().max(2000).allow("", null).optional(),
  categoryName: Joi.string().trim().min(2).max(100).required(),
  coverImage: Joi.string().trim().max(255).required(),
  price: Joi.number().precision(2).min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

export const validateBook = validator(bookSchema);
