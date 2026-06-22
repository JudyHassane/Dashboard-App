import Joi from "joi";
import { validator } from "../../common/validator";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().lowercase().max(254).required(),
  password: Joi.string().trim().min(8).max(64).required(),
  confirmPassword: Joi.string().trim().valid(Joi.ref("password")).required(),
});

export const validateRegister = validator(registerSchema);
