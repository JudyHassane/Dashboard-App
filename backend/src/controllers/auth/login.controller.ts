import { Response } from "express";
import { LoginRequest } from "../../types/auth.types";
import { authService } from "../../services/auth/auth.service";

export const login = async (req: LoginRequest, res: Response) => {
  const user = req.user!;

  const { accessToken, refreshToken } = await authService.issueTokens(user.id);
  authService.setRefreshTokenCookie(res, refreshToken);

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};
