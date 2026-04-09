import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { users } from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { refreshTokens } from "../store/refreshTokens";
import { RefreshRequest } from "../middleware/refreshToken.middleware";
import { v4 as uuidv4 } from "uuid";

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
      return res.status(400).json({ message: "Wrong email or password" });
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
    const { token: refreshToken, tokenId } = generateRefreshToken(user.id);

    const hashedToken = await bcrypt.hash(refreshToken, 10);

    refreshTokens.set(tokenId, hashedToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "strict",
    });

    return res.json({ accessToken });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// REFRESH
export const refresh = (req: RefreshRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = generateAccessToken(userId);

  return res.json({ accessToken: newAccessToken });
};

// LOGOUT
export const logout = (req: RefreshRequest, res: Response) => {
  const tokenId = req.refreshToken;

  if (tokenId) {
    refreshTokens.delete(tokenId);
  }

  res.clearCookie("refreshToken");

  return res.json({ message: "Logged out successfully" });
};
