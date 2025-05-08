import { pool } from "../config/db";
import { hashPassword, comparePassword } from "../utils/hash";
import jwt from "jsonwebtoken";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashed = await hashPassword(password);
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [username, email, hashed]);
  return result.rows[0];
};

export const loginUser = async (loginKey: string, password: string) => {
  // Bisa username atau email
  const query = "SELECT * FROM users WHERE username = $1 OR email = $1 LIMIT 1";
  const result = await pool.query(query, [loginKey]);
  const user = result.rows[0];

  if (!user) throw new Error("User not found");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return { token, user };
};
