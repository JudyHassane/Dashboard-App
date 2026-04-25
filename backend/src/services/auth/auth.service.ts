import bcrypt from "bcrypt";
import { Response } from "express";
import { ENV } from "../../config/env";
import ms from "ms";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

// Password utilities
export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compare(plain, hashed);

// In-memory store for refresh tokens (tokenId -> hashedToken)
export const refreshTokens = new Map<string, string>();

// Sets refresh token cookie
export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ms(ENV.REFRESH_TOKEN_EXPIRATION),
  });
};

// Generates access and refresh tokens and stores hashed refresh token server-side
export const issueTokens = async (userId: number) => {
  const accessToken = generateAccessToken(userId);

  const { token: refreshToken, tokenId } = generateRefreshToken(userId);
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  refreshTokens.set(tokenId, hashedToken);

  return { accessToken, refreshToken };
};
