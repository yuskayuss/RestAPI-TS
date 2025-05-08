// src/routes/external.route.ts
import { Router } from "express";
import { integrateExternalData } from "../controllers/external.controller";

const router = Router();

// Endpoint untuk mengintegrasikan API eksternal
router.post("/integrate-external", integrateExternalData);

export default router;
