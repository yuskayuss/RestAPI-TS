import { Request, Response, RequestHandler } from "express";
import { transferBalance } from "../services/transfer.service"; // Sesuaikan path ke service

// Menggunakan RequestHandler dengan tipe pengembalian yang benar (Promise<void>)
export const transferController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { senderId, receiverId, amount } = req.body;

    // Validasi input parameter
    if (!senderId || !receiverId || !amount) {
      res.status(400).json({ message: "Missing parameters" });
      return; // Tidak perlu mengembalikan apa-apa lagi
    }

    if (senderId === receiverId) {
      res
        .status(400)
        .json({ message: "Sender and receiver cannot be the same" });
      return;
    }
    // Panggil service untuk mengeksekusi transfer
    const result = await transferBalance(senderId, receiverId, amount);

    // Kirim response sukses
    res.status(200).json({
      message: "Transfer successful",
      data: result,
    });
  } catch (err) {
    // Penanganan error
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error", err);
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
