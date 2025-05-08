import { pool } from "../config/db";

export const storeItem = async (code: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock tabel untuk menghindari race condition
    await client.query("LOCK TABLE items IN EXCLUSIVE MODE");

    // Dapatkan running_number terakhir
    const result = await client.query(
      "SELECT MAX(running_number) as max FROM items"
    );
    const runningNumber = result.rows[0].max ? result.rows[0].max + 1 : 1;

    // Simpan data baru
    const insertQuery = `
      INSERT INTO items (code, running_number)
      VALUES ($1, $2)
      RETURNING id, code, running_number
    `;
    const insertResult = await client.query(insertQuery, [code, runningNumber]);

    await client.query("COMMIT");
    return insertResult.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
