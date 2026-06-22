import { Router } from "express";
import { getCategories } from "../controllers/categories/getCategories.controller";
import { validateListQuery } from "../middleware/common/validateListQuery";

const router = Router();

router.get("/", validateListQuery, getCategories);

export default router;
