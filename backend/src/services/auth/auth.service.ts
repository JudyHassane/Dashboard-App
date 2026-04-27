import bcrypt from "bcrypt";
import { Response } from "express";
import { ENV } from "../../config/env";
import ms from "ms";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

class AuthService {
  // In-memory store for refresh tokens (tokenId -> hashedToken)
  public refreshTokens = new Map<string, string>();

  // Password utilities
  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  // Sets refresh token cookie
  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ms(ENV.REFRESH_TOKEN_EXPIRATION),
    });
  }

  // Generates access + refresh tokens and stores hashed refresh token server-side
  async issueTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = generateAccessToken(userId);
    const { token: refreshToken, tokenId } = generateRefreshToken(userId);
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    this.refreshTokens.set(tokenId, hashedToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const authService = new AuthService();
