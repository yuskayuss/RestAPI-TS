// src/controllers/external.controller.ts
import { Request, Response } from "express";
import { fetchExternalData } from "../services/external.service";
import { pool } from "../config/db";
import { errorHandler } from "../utils/errorHandler";

// Endpoint untuk mengintegrasikan API eksternal dan simpan data ke database
export const integrateExternalData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Mengambil data dari API eksternal
    const data = await fetchExternalData();

    // Menyimpan data ke database menggunakan raw query
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Simpan data ke tabel (misalnya `external_data`)
      const insertQuery = `
        INSERT INTO external_data (title, body)
        VALUES ($1, $2) RETURNING id, title, body
      `;

      for (const item of data) {
        await client.query(insertQuery, [item.title, item.body]);
      }

      await client.query("COMMIT");
      res.status(200).json({
        message: "External data integrated successfully",
        data,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      errorHandler(err, res);
    } finally {
      client.release();
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
