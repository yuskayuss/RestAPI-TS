import { Request, Response } from "express";
// import {getAllProducts} from

export const getAllProducts = async (req: Request, res: Response) => {
  res.json({
    message: "List of products",
    data: [
      { id: 1, nama_produk: "combed 30s", harga_jual: 30000 },
      { id: 2, nama_produk: "combed 24s", harga_jual: 28000 },
    ],
  });
};
