import { Request, Response } from "express";
import { User } from "../../orm/entities/users/user.entity";
import { AppDataSource } from "../../orm/config/ormconfig";
import { authService } from "../../services/auth/auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await authService.hashPassword(password);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hashedPassword;
  await userRepository.save(newUser);

  const { accessToken, refreshToken } = await authService.issueTokens(
    newUser.id,
  );
  authService.setRefreshTokenCookie(res, refreshToken);

  return res.customSuccess(201, "Registration successful", {
    accessToken: accessToken,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});
