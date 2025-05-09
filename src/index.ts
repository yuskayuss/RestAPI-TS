import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import itemRoutes from "./routes/item.route"; // Mengimpor itemRoutes yang benar
import externalRoutes from "./routes/external.route";
import taskRoutes from "./routes/task.route";
import { startTaskScheduler } from "./scheduler/task.scheduler";
import transferRouter from "./routes/transfer.route"; // Pastikan path sesuai
import reportRoutes from "./routes/report.routes";
import { logRequest } from "./middleware/log.middleware";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

app.use("/api/auth", authRoutes); // Endpoint untuk autentikasi
app.use(logRequest);
app.use("/api", itemRoutes); // Endpoint untuk item
app.use("/api", externalRoutes);
app.use("/api", taskRoutes);
app.use("/api/transfer", transferRouter);
app.use("/api/reports", reportRoutes);
app.use("/api/products", productRoutes); // Penting!

startTaskScheduler();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

declare global {
  namespace Express {
    export interface Request {
      userId?: number; // Atau tipe data lain sesuai dengan userId yang kamu miliki
    }
  }
}
