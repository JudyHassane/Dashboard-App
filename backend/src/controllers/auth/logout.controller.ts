import { Response } from "express";
import { RefreshRequest } from "../../types/auth.types";
import { authService } from "../../services/auth/auth.service";
import { ENV } from "../../config/env";

export const logout = (req: RefreshRequest, res: Response) => {
  const tokenId = req.refreshToken;

  if (tokenId) {
    authService.refreshTokens.delete(tokenId);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.json({ message: "Logged out successfully" });
};
