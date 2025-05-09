import { Request, Response } from "express";
import { pool } from "../config/db";
import * as reportService from "../services/report.service";

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

export const getOrdersByCity = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT c.city, COUNT(o.id) AS total_orders
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      GROUP BY c.city
      ORDER BY total_orders DESC;
    `;
    const result = await pool.query(query);

    res.status(200).json({
      message: "Orders by city retrieved",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error getting orders by city:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStockReport = async (req: Request, res: Response) => {
  try {
    const data = await reportService.getStockReport();
    res.status(200).json({ message: "Stock report retrieved", data });
  } catch (error) {
    console.error("Stock report error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequestsPerHour = async (req: Request, res: Response) => {
  try {
    const data = await reportService.getRequestsPerHour();
    res.json({ message: "Requests per hour retrieved", data });
  } catch (err) {
    console.error("Error getting requests per hour:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
