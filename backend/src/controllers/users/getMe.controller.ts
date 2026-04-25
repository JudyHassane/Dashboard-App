import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { User } from "../../orm/entities/users/user.entity";
import { AppDataSource } from "../../orm/config/ormconfig";
import { asyncHandler } from "../../utils/asyncHandler";
import { NotFoundError } from "../../utils/errors/CustomError";

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
