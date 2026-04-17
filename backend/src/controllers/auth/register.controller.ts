import { Request, Response } from "express";
import { User } from "../../models/users/user.model";
import { AppDataSource } from "../../orm/config/ormconfig";
import {
  hashPassword,
  issueTokens,
  setRefreshTokenCookie,
} from "../../services/auth/auth.service";

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Get user repository
  const userRepository = AppDataSource.getRepository(User);

  // Hash password before saving to database
  const hashedPassword = await hashPassword(password);

  // Create new user and save to database
  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hashedPassword;
  await userRepository.save(newUser);

  // Issue tokens and set refresh token cookie
  const { accessToken, refreshToken } = await issueTokens(newUser.id);
  setRefreshTokenCookie(res, refreshToken);

  // HTTP Response
  return res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    accessToken,
  });
};
