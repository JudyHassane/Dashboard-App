import Joi from "joi";
import { validator } from "../../validator";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),
  email: Joi.string().trim().email().lowercase().max(254).required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "string.max": "Email must be at most 254 characters",
  }),
  password: Joi.string().trim().min(8).max(64).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 64 characters",
  }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.required": "Please confirm your password",
      "string.empty": "Please confirm your password",
      "any.only": "Passwords do not match",
    }),
});

export const validateRegister = validator(registerSchema);
