import { Router } from "express";
import { transferController } from "../controllers/transfer.controller"; // Pastikan path sesuai

const router = Router();

// Route untuk transfer
router.post("/", transferController);

export default router; // Pastikan ada ekspor default
