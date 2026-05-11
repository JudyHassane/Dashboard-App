import Joi from "joi";
import { validator } from "../../common/validator";

const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().max(254).required(),
  password: Joi.string().trim().min(8).max(64).required(),
});

export const validateLogin = validator(loginSchema);
