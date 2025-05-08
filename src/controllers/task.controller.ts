// src/controllers/task.controller.ts
import { Request, Response } from "express";
import { createScheduledTask } from "../services/task.service";

export const scheduleTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description, runAt } = req.body;
    const task = await createScheduledTask(description, new Date(runAt));
    res.status(201).json({ message: "Task scheduled", data: task });
  } catch (err) {
    res.status(500).json({ error: "Failed to schedule task" });
  }
};
