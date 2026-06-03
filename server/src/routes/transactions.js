import { Router } from "express";
import { getTransactions, createTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, getTransactions);
router.post("/", authenticate, createTransaction);
router.delete("/:id", authenticate, deleteTransaction);

export default router;
