import { Request, Response } from "express";
import { User } from "../../orm/entities/users/user.entity";
import { AppDataSource } from "../../orm/config/ormconfig";
import {
  hashPassword,
  issueTokens,
  setRefreshTokenCookie,
} from "../../services/auth/auth.service";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hashPassword(password);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hashedPassword;
  await userRepository.save(newUser);

  const { accessToken, refreshToken } = await issueTokens(newUser.id);
  setRefreshTokenCookie(res, refreshToken);

  return res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    accessToken,
  });
};
