import { Response } from "express";
import { RefreshRequest } from "../../types/auth.types";
import { refreshTokens } from "../../services/auth/auth.service";
import { ENV } from "../../config/env";

export const logout = (req: RefreshRequest, res: Response) => {
  const tokenId = req.refreshToken;

  if (tokenId) {
    refreshTokens.delete(tokenId);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.json({ message: "Logged out successfully" });
};
