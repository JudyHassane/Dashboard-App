import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../orm/config/ormconfig";
import { User } from "../../../orm/entities/users/user.entity";
import { ConflictError } from "../../../utils/response/custom-error/CustomError";
import { asyncHandler } from "../../../utils/asyncHandler";

export const checkEmailExists = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const existing = await userRepository.findOneBy({ email: req.body.email });

    if (existing) {
      throw new ConflictError("Email already registered");
    }

    next();
  },
);
