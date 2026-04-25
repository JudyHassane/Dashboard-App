import { Response } from "express";
import { generateAccessToken } from "../../utils/jwt";
import { RefreshRequest } from "../../types/auth.types";

export const refresh = (req: RefreshRequest, res: Response) => {
  const userId = req.userId!;

  const newAccessToken = generateAccessToken(userId);

  return res.json({ accessToken: newAccessToken });
};
