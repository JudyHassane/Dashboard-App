import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: "30sec",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
