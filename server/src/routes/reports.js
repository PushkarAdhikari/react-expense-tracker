import { Router } from "express";
import { getMonthlyReport, getCategoryReport } from "../controllers/reportController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/monthly", authenticate, getMonthlyReport);
router.get("/category", authenticate, getCategoryReport);

export default router;
