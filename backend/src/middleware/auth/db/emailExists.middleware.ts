import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../orm/config/ormconfig";
import { User } from "../../../models/users/user.model";
import { ConflictError } from "../../../utils/response/errors/CustomError";
import { asyncHandler } from "../../../utils/response/asyncHandler";

export const checkEmailExists = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const existing = await userRepository.findOneBy({ email: req.body.email });

    if (existing) {
      return next(new ConflictError("Email already registered"));
    }

    return next();
  },
);
