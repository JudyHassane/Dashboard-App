import { Response } from "express";
import {
  issueTokens,
  setRefreshTokenCookie,
} from "../../services/auth/auth.service";
import { LoginRequest } from "../../types/auth.types";

export const login = async (req: LoginRequest, res: Response) => {
  const user = req.user!;

  const { accessToken, refreshToken } = await issueTokens(user.id);
  setRefreshTokenCookie(res, refreshToken);

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};
