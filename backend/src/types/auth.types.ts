import { Request } from "express";
import { User } from "../orm/entities/users/user.entity";

export interface LoginRequest extends Request {
  user?: User;
}

export interface RefreshRequest extends Request {
  refreshToken?: string;
  userId?: number;
}

export interface AuthRequest extends Request {
  userId?: number;
}
