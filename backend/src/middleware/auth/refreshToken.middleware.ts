import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";
import bcrypt from "bcrypt";
import {
  UnauthorizedError,
  ForbiddenError,
} from "../../utils/response/errors/CustomError";
import { refreshTokens } from "../../services/auth/auth.service";
import { RefreshRequest } from "../../types/auth.types";

// Validate the refresh token before allowing access to the /refresh controller.
export const validateRefreshToken = async (
  req: RefreshRequest,
  _res: Response,
  next: NextFunction,
) => {
  // Get the refresh token from the cookie
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new UnauthorizedError("Refresh token required");
  }

  // Verify the refresh token
  const refreshTokenPayload = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as {
    id: number;
    jti: string;
  };

  // Check if the refresh token exists in storage
  const storedHash = refreshTokens.get(refreshTokenPayload.jti);
  if (!storedHash) {
    throw new ForbiddenError("Invalid refresh token");
  }

  // Compare the refresh token with the stored hash
  const isValid = await bcrypt.compare(token, storedHash);
  if (!isValid) {
    throw new ForbiddenError("Invalid refresh token");
  }

  req.userId = refreshTokenPayload.id;
  req.refreshToken = refreshTokenPayload.jti;

  next();
};
