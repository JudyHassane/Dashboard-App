import { Response } from "express";
import { LoginRequest } from "../../types/auth.types";
import { authService } from "../../services/auth/auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const login = asyncHandler(async (req: LoginRequest, res: Response) => {
  const user = req.user!;

  const { accessToken, refreshToken } = await authService.issueTokens(user.id);
  authService.setRefreshTokenCookie(res, refreshToken);

  return res.customSuccess(200, "Login successful", {
    accessToken: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
