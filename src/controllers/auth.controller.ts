import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { loginKey, password } = req.body;
    const result = await loginUser(loginKey, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
