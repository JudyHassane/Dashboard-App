import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { refreshTokens } from "../store/refreshTokens";
import bcrypt from "bcrypt";

export interface RefreshRequest extends Request {
  refreshToken?: string;
  userId?: string;
}

export const refreshTokenMiddleware = async (
  req: RefreshRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as {
      id: string;
      jti: string;
    };

    const storedHash = refreshTokens.get(decoded.jti);

    if (!storedHash) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const isValid = await bcrypt.compare(token, storedHash);

    if (!isValid) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    req.userId = decoded.id;
    req.refreshToken = decoded.jti;

    next();
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
