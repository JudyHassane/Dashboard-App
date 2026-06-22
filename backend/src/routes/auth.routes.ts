import { Router } from "express";
import { validateRefreshToken } from "../middleware/auth/refreshToken.middleware";
import { register } from "../controllers/auth/register.controller";
import { login } from "../controllers/auth/login.controller";
import { refresh } from "../controllers/auth/refresh.controller";
import { logout } from "../controllers/auth/logout.controller";
import { validateRegister } from "../middleware/auth/schema/register.validator";
import { validateLogin } from "../middleware/auth/schema/login.validator";
import { checkEmailExists } from "../middleware/auth/db/emailExists.middleware";
import { validateLoginCredentials } from "../middleware/auth/db/loginCredentials.middleware";

const router = Router();

router.post("/register", validateRegister, checkEmailExists, register);
router.post("/login", validateLogin, validateLoginCredentials, login);
router.post("/refresh", validateRefreshToken, refresh);
router.post("/logout", validateRefreshToken, logout);

export default router;
