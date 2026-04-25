import { Response, NextFunction } from "express";
import { AppDataSource } from "../../../orm/config/ormconfig";
import { User } from "../../../orm/entities/users/user.entity";
import { comparePassword } from "../../../services/auth/auth.service";
import { BadRequestError } from "../../../utils/errors/CustomError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { LoginRequest } from "../../../types/auth.types";

export const validateLoginCredentials = asyncHandler(
  async (req: LoginRequest, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    req.user = user;

    return next();
  },
);
