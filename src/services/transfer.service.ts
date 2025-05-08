import { pool } from "../config/db";

export const transferBalance = async (
  senderId: number,
  receiverId: number,
  amount: number
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Cek saldo pengirim dulu
    const senderResult = await client.query(
      "SELECT balance FROM users WHERE id = $1",
      [senderId]
    );
    if (senderResult.rowCount === 0) {
      throw new Error("Sender not found");
    }

    const senderBalance = parseFloat(senderResult.rows[0].balance);
    if (senderBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // Update saldo pengirim
    const updateSender = await client.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance",
      [amount, senderId]
    );

    // Update saldo penerima
    const updateReceiver = await client.query(
      "UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance",
      [amount, receiverId]
    );
    if (updateReceiver.rowCount === 0) {
      throw new Error("Receiver not found");
    }

    await client.query("COMMIT");

    return {
      senderBalance: updateSender.rows[0].balance,
      receiverBalance: updateReceiver.rows[0].balance,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Transfer error:", err);
    throw err;
  } finally {
    client.release();
  }
};
