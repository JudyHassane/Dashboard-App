import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import bookRoutes from "./book.routes";
import categoryRoutes from "./category.routes";
import dashboardRoutes from "./dashboard.routes";
import uploadRoutes from "./uploads.routes";
import { authMiddleware } from "../middleware/auth/auth.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use(authMiddleware);
router.use("/uploads", uploadRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
