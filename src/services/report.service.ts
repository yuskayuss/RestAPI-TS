import { pool } from "../config/db";

export const getStockReport = async () => {
  const result = await pool.query(`
  SELECT nama_produk, SUM(stok) AS stok
  FROM produk
  GROUP BY nama_produk
  ORDER BY nama_produk
`);
  return result.rows;
};

export const getRequestsPerHour = async () => {
  const result = await pool.query(`
    SELECT 
      DATE_TRUNC('hour', requested_at) AS hour,
      COUNT(*) AS total_requests
    FROM request_logs
    GROUP BY hour
    ORDER BY hour
  `);

  return result.rows;
};
