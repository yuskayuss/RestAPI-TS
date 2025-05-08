// src/services/task.service.ts
import { pool } from "../config/db";

export const createScheduledTask = async (description: string, runAt: Date) => {
  const query = `
    INSERT INTO tasks (description, run_at, status)
    VALUES ($1, $2, 'pending')
    RETURNING *
  `;
  const values = [description, runAt];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getPendingTasks = async () => {
  const now = new Date().toISOString();
  const query = `
    SELECT * FROM tasks
    WHERE status = 'pending' AND run_at <= $1
  `;
  const result = await pool.query(query, [now]);
  return result.rows;
};

export const markTaskAsCompleted = async (taskId: number) => {
  const query = `UPDATE tasks SET status = 'done' WHERE id = $1`;
  await pool.query(query, [taskId]);
};
