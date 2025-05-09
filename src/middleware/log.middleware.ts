// src/middleware/log.middleware.ts
import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db"; // Pastikan koneksi database sudah benar

export const logRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { method, originalUrl } = req;
    const userId = req.userId || null; // Misalnya userId ada di dalam request (setelah login)

    // Simpan log request ke database
    await pool.query(
      `
      INSERT INTO request_logs (method, route, user_id, timestamp)
      VALUES ($1, $2, $3, NOW())`,
      [method, originalUrl, userId]
    );

    next(); // Lanjutkan ke middleware atau route handler berikutnya
  } catch (error) {
    console.error("Failed to log request", error);
    next(); // Lanjutkan meskipun error logging
  }
};
