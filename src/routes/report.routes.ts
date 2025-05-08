import { Router } from "express";
import { getTopCustomer } from "../controllers/report.controller";

const router = Router();

// endpoint GET /api/reports/top-customer
router.get("/top-customer", getTopCustomer);

export default router;
