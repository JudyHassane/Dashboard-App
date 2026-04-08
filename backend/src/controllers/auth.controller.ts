import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { users } from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { refreshTokens } from "../store/refreshTokens";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../config/env";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation 1 - All fields are required
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validation 2 - Passwords must match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validation 3 - Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Wrong email orpassword" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation 1 - Email exists
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validation 2 - Password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    refreshTokens.push(refreshToken);

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// REFRESH
export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as {
      id: string;
    };

    const newAccessToken = generateAccessToken(decoded.id);

    return res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// LOGOUT
export const logout = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) {
    refreshTokens.splice(index, 1);
  }

  return res.json({ message: "Logged out successfully" });
};
