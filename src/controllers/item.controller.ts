import { Request, Response, RequestHandler } from "express";
import { storeItem } from "../services/item.service";

export const createItem: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.body;

    // Simpan ke database melalui service
    const item = await storeItem(code);

    res.status(201).json({
      message: "Item stored successfully",
      data: item,
    });
  } catch (err) {
    console.error("Create item error:", err); // untuk debugging
    res.status(500).json({ error: "Internal server error" });
  }
};
