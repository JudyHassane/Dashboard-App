import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { v4 as uuidv4 } from "uuid";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });
};

export const generateRefreshToken = (userId: string) => {
  const tokenId = uuidv4();

  const token = jwt.sign(
    { id: userId, jti: tokenId },
    ENV.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return { token, tokenId };
};
