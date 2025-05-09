import { Router } from "express";
import { getTopCustomer } from "../controllers/report.controller";
import { getOrdersByCity } from "../controllers/report.controller";
import * as reportController from "../controllers/report.controller";

const router = Router();

// endpoint GET /api/reports/top-customer
router.get("/top-customer", getTopCustomer);
router.get("/orders-by-city", getOrdersByCity);
router.get("/stock-report", reportController.getStockReport);
router.get("/requests-per-hour", reportController.getRequestsPerHour);

export default router;
