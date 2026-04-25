import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { User } from "../../models/users/user.model";
import { AppDataSource } from "../../orm/config/ormconfig";
import { asyncHandler } from "../../utils/response/asyncHandler";
import { NotFoundError } from "../../utils/response/errors/CustomError";

// GET my profile
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: req.userId });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});
