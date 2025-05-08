// src/scheduler/task.scheduler.ts
import cron from "node-cron";
import { getPendingTasks, markTaskAsCompleted } from "../services/task.service";

export const startTaskScheduler = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const tasks = await getPendingTasks();
      for (const task of tasks) {
        console.log("Running task:", task.description);
        await markTaskAsCompleted(task.id);
      }
    } catch (err) {
      console.error("Scheduler error:", err);
    }
  });
};
