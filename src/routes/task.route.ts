// src/routes/task.route.ts
import { Router } from "express";
import { scheduleTask } from "../controllers/task.controller";

const router = Router();
router.post("/schedule-task", scheduleTask);

export default router;
