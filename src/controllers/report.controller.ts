import { Request, Response } from "express";
import { pool } from "../config/db";

export const getTopCustomer = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT customer_id, COUNT(*) as total_orders
      FROM orders
      GROUP BY customer_id
      ORDER BY total_orders DESC
      LIMIT 1
    `);

    res.status(200).json({
      message: "Top customer retrieved",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
