import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { users } from "../models/user.model";

// GET my profile
export const getMe = (req: AuthRequest, res: Response) => {
  const user = users.find((u) => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};
