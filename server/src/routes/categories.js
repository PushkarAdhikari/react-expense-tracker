import { Router } from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, getCategories);
router.post("/", authenticate, createCategory);

export default router;
