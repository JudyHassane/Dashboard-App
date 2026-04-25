import Joi from "joi";
import { validator } from "../../validator";

const loginSchema = Joi.object({
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
});

export const validateLogin = validator(loginSchema);
