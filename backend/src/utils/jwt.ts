import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { v4 as uuidv4 } from "uuid";

// Generates Access Token
export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_EXPIRATION,
  });
};

// Generates Refresh Token
export const generateRefreshToken = (userId: number) => {
  const tokenId = uuidv4();

  const token = jwt.sign(
    { id: userId, jti: tokenId },
    ENV.REFRESH_TOKEN_SECRET,
    { expiresIn: ENV.REFRESH_TOKEN_EXPIRATION },
  );

  return { token, tokenId };
};
