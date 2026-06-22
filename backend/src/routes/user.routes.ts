import { Router } from "express";
import { getMe } from "../controllers/users/getMe.controller";

const router = Router();

router.get("/me", getMe);

export default router;
