import { Router } from "express";
import { getDashboard } from "../controllers/dashboard/getDashboard.controller";
import { getDashboardKpis } from "../controllers/dashboard/getDashboardKpis.controller";

const router = Router();

router.get("/", getDashboard);
router.get("/kpis", getDashboardKpis);

export default router;
