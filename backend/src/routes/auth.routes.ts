import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller";
import { refreshTokenMiddleware } from "../middleware/refreshToken.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshTokenMiddleware, refresh);
router.post("/logout", refreshTokenMiddleware, logout);

export default router;
